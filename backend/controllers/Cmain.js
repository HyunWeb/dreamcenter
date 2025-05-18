const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
  User,
  AboutSlide,
  AboutWrite,
  OfficeSlide,
  OfficeWrite,
} = require("../models");
const { sequelize } = require("../models");

const multer = require("multer");
const sharp = require("sharp");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { parseStringPromise } = require("xml2js");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.postUpload = [
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file)
        return res.status(400).json({ message: "제공된 파일이 없습니다." });

      const ext = path.extname(file.originalname); // 확장자 추출
      const key = `uploads/${uuidv4()}_${ext}`;
      console.log(key);

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      res.status(200).json({ url: fileUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  },
];

exports.postLogin = async (req, res) => {
  const { code, state } = req.body;
  try {
    // 네이버로부터 엑세스 토큰 요청
    const tokenResponse = await axios.get(
      "https://nid.naver.com/oauth2.0/token",
      {
        params: {
          grant_type: "authorization_code",
          client_id: "ZrPAGA0oGqag2F39pAFq",
          client_secret: "8HZ6xintJn",
          code,
          state,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // access_token을 가지고 사용자 정보 요청
    const profileResponse = await axios.get(
      "https://openapi.naver.com/v1/nid/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = profileResponse.data.response;
    // DB에 해당 유저가 저장되어 있는지 확인
    let existingUser = await User.findOne({ where: { sns_id: userData.id } });
    console.log("유저데이타", existingUser);
    let user;
    // 정보가 없다면 유저 정보 기반으로 자동 회원가입 개시
    if (!existingUser) {
      user = await User.create({
        sns_id: userData.id,
        provider: "naver",
        name: userData.name,
        nickname: userData.nickname,
        email: userData.email,
        profile_image: userData.profile_image,
        age: userData.age,
        gender: userData.gender,
        mobile: userData.mobile,
        birthyear: userData.birthyear,
        birthday: userData.birthday,
      });
    } else {
      user = existingUser;
    }
    // 유저 데이터를 기반으로 JWT 토큰 생성
    const token = jwt.sign({ userID: userData.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 2,
    });
    res.status(200).json({ message: "로그인 성공", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "로그인 실패" });
  }
};

exports.postLogout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ message: "로그아웃 완료" });
};

exports.getNews = async (req, res) => {
  const rssUrl = "https://blog.rss.naver.com/makedoc.xml";
  try {
    const response = await axios.get(rssUrl, { responseType: "text" });
    const parsed = await parseStringPromise(response.data);
    const items = parsed.rss.channel[0].item;

    const simplified = items.map((item) => {
      const rawDescription = item.description?.[0] || ""; // 설명 전체
      // 이미지 태그를 만난 부분부터 닫는 태그까지 탐색을 진행하다 src=를 만나면 "'를 제외한 글자가 연속으로 나오는 부분을 캡쳐해라 대소문자 상관없이
      const imgMatch = rawDescription.match(/<img[^>]*src=["']([^"']+)["']/i);
      const imgUrl = imgMatch ? imgMatch[1] : null; // 첫번째 배열은 이미지 태그 전체, 두번째가 내가 캡쳐한 주소 부분
      // 이미지 태그 <img 부터 탐색을 시작해서 >를 제외한 이전 모든 부분을 탐색한다. g = 글로벌하게 글 속의 모든 img태그를 찾는다 i = 대소문자 구분없이 탐색
      const cleanDescription = rawDescription.replace(/<img[^>]*/gi, "").trim();

      const year = new Date(item.pubDate[0]).getFullYear();
      const month = String(new Date(item.pubDate[0]).getMonth() + 1).padStart(
        2,
        "0"
      );
      const date = String(new Date(item.pubDate[0]).getDate()).padStart(2, "0");
      const hour = String(new Date(item.pubDate[0]).getHours()).padStart(
        2,
        "0"
      );
      const minutes = String(new Date(item.pubDate[0]).getMinutes()).padStart(
        2,
        "0"
      );
      const Dates = `${year}.${month}.${date}.${hour}:${minutes}`;
      return {
        title: item.title[0],
        link: item.link[0],
        date: Dates,
        description: cleanDescription,
        img: imgUrl,
      };
    });

    res.status(200).json({ message: simplified });
  } catch (err) {
    console.error("rss 받아오기 실패", err);
  }
};

exports.PostAboutImgUpload = [
  upload.array("images", 100),
  async (req, res) => {
    const files = req.files;
    if (!files)
      return res.status(400).json({ message: "제공된 파일이 없습니다." });
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const ext = path.extname(file.originalname);
        const key = `uploads/${uuidv4()}${ext}`;

        // 파일 압축
        const compressedBuffer = await sharp(file.buffer)
          .rotate()
          .resize({ width: 800 })
          .webp({ quality: 80 })
          .toBuffer();

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
          Body: compressedBuffer,
          ContentType: "image/webp",
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        uploadedUrls.push(fileUrl);
      }

      const currentCount = await AboutSlide.count();

      const SlideData = uploadedUrls.map((url, index) => ({
        image_url: url,
        sort_order: currentCount + index,
        name: files[index].originalname,
      }));

      await AboutSlide.bulkCreate(SlideData); // bulkCreate > 레코드 여러 개 한 번에 생성

      res.status(200).json({ urls: uploadedUrls });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버에서 이미지 받기 실패" });
    }
  },
];
exports.PostOfficeImgUpload = [
  upload.array("images", 100),
  async (req, res) => {
    const files = req.files;
    if (!files)
      return res.status(400).json({ message: "제공된 파일이 없습니다." });
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const ext = path.extname(file.originalname);
        const key = `uploads/${uuidv4()}${ext}`;

        // 파일 압축
        const compressedBuffer = await sharp(file.buffer)
          .rotate()
          .resize({ width: 800 })
          .webp({ quality: 80 })
          .toBuffer();

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
          Body: compressedBuffer,
          ContentType: "image/webp",
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        uploadedUrls.push(fileUrl);
      }

      const currentCount = await OfficeSlide.count();

      const SlideData = uploadedUrls.map((url, index) => ({
        image_url: url,
        sort_order: currentCount + index,
        name: files[index].originalname,
      }));

      await OfficeSlide.bulkCreate(SlideData); // bulkCreate > 레코드 여러 개 한 번에 생성

      res.status(200).json({ urls: uploadedUrls });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버에서 이미지 받기 실패" });
    }
  },
];

exports.GetAboutImgUpload = async (req, res) => {
  try {
    const slides = await AboutSlide.findAll({
      order: [["sort_order", "ASC"]], // 슬라이드 순서대로 정렬
    });
    res.status(200).json({ slides });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AboutSlide 슬라이드 목록 조회 실패" });
  }
};
exports.GetOfficeImgUpload = async (req, res) => {
  try {
    const slides = await OfficeSlide.findAll({
      order: [["sort_order", "ASC"]], // 슬라이드 순서대로 정렬
    });
    res.status(200).json({ slides });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "WriteSlide 슬라이드 목록 조회 실패" });
  }
};

exports.EditAboutImgUpload = async (req, res) => {
  const newArray = req.body;
  const tx = await sequelize.transaction();
  try {
    await AboutSlide.destroy({ where: {}, transaction: tx });
    await AboutSlide.bulkCreate(newArray, { transaction: tx });
    await tx.commit();
    res.status(200).json({ message: newArray });
  } catch (err) {
    await tx.rollback();
    console.error(err);
    res.status(500).json({ message: "AboutSlide 슬라이드 목록 수정 실패" });
  }
};
exports.EditOfficeImgUpload = async (req, res) => {
  const newArray = req.body;
  const tx = await sequelize.transaction();
  try {
    await OfficeSlide.destroy({ where: {}, transaction: tx });
    await OfficeSlide.bulkCreate(newArray, { transaction: tx });
    await tx.commit();
    res.status(200).json({ message: newArray });
  } catch (err) {
    await tx.rollback();
    console.error(err);
    res.status(500).json({ message: "OfficeSlide 슬라이드 목록 수정 실패" });
  }
};

exports.PostAboutWrite = async (req, res) => {
  try {
    const content =
      typeof req.body.content === "string" ? req.body.content : "";

    const existing = await AboutWrite.findOne({ where: { id: 1 } });
    if (existing) {
      await existing.update({ content });
    } else {
      await AboutWrite.create({ id: 1, content });
    }
    return res.status(200).json({ message: "저장 및 업데이트 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "About 페이지 텍스트 수정 실패(서버)" });
  }
};

exports.PostOfficeWrite = async (req, res) => {
  try {
    const content =
      typeof req.body.content === "string" ? req.body.content : "";

    const existing = await OfficeWrite.findOne({ where: { id: 1 } });
    if (existing) {
      await existing.update({ content });
    } else {
      await OfficeWrite.create({ id: 1, content });
    }
    return res.status(200).json({ message: "저장 및 업데이트 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Office 페이지 텍스트 수정 실패(서버)" });
  }
};

exports.GetAboutWrite = async (req, res) => {
  try {
    const existing = await AboutWrite.findOne({ where: { id: 1 } });
    if (!existing) {
      // 초기 페이지 로딩 시에 row가 없으면 기본값으로 응답
      return res.status(200).json({ result: { content: "" } });
    }
    return res.status(200).json({ result: existing });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "About 페이지 텍스트 가져오기 실패(서버)" });
  }
};
exports.GetOfficeWrite = async (req, res) => {
  try {
    const existing = await OfficeWrite.findOne({ where: { id: 1 } });

    if (!existing) {
      // 초기 페이지 로딩 시에 row가 없으면 기본값으로 응답
      return res.status(200).json({ result: { content: "" } });
    }
    return res.status(200).json({ result: existing });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Office 페이지 텍스트 가져오기 실패(서버)" });
  }
};
