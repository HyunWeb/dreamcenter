const axios = require("axios");
const jwt = require("jsonwebtoken");

const {
  User,
  AboutSlide,
  AboutWrite,
  OfficeSlide,
  OfficeWrite,
  ReservationSubmit,
  Users,
  QuestionSubmit,
  Answer,
  GalleryImage,
  MainPage,
  Location,
  Footer,
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
const { Op } = require("sequelize");

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

exports.getLoginState = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ code: "NO_TOKEN", message: "로그인이 필요합니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { sns_id: decoded.userID } });
    return res.status(200).json({
      code: "SUCCESS",
      name: user.name,
      role: user.role,
      sns_id: user.sns_id,
    }); // 필요한 정보만 응답
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ code: "TOKEN_EXPIRED", message: "세션이 만료되었습니다." });
    }
    return res
      .status(401)
      .json({ code: "INVALID_TOKEN", message: "잘못된 인증 정보입니다." });
  }
};

exports.postLogin = async (req, res) => {
  const { code, state, originalState } = req.body;
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  console.log(adminEmails);
  if (state !== originalState) {
    return;
  }

  try {
    // 네이버로부터 엑세스 토큰 요청
    const tokenResponse = await axios.get(
      "https://nid.naver.com/oauth2.0/token",
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.NAVER_CLIENT_ID,
          client_secret: process.env.NAVER_CLIENT_SECRET,
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
    let user;
    // 정보가 없다면 유저 정보 기반으로 자동 회원가입 개시
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    console.log(adminEmails);
    const isAdmin = adminEmails.includes(userData.email);
    console.log(isAdmin);
    if (!existingUser) {
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
      const isAdmin = adminEmails.includes(userData.email);
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
        role: isAdmin ? "admin" : "user",
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
    res.status(500).json({ message: "로그인 실패(서버)" });
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

exports.getUserInfo = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "로그인 필요" });
  try {
    // 사용자 토큰 제작시 사용했던 ID 추출
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userID;
    const userData = await User.findOne({ where: { sns_id: userId } });

    return res.status(200).json({ result: userData });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Office 페이지 텍스트 가져오기 실패(서버)" });
  }
};

exports.PostReservationSubmit = [
  upload.array("images", 100),
  async (req, res) => {
    const files = req.files;
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "로그인 필요" });
    try {
      // 사용자 토큰 제작시 사용했던 ID 추출
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const uploadedUrls = [];
      for (const file of files) {
        const ext = path.extname(file.originalname);
        const key = `uploads/${uuidv4()}${ext}`;

        // 이미지 압축
        const compressedBuffer = await sharp(file.buffer)
          .rotate()
          .resize({ width: 800 })
          .webp({ quality: 80 })
          .toBuffer();

        // s3 업로드
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
      req.body.files = uploadedUrls;

      const submitData = {
        ...req.body,
        sns_id: decoded.userID,
        agreePrivacy: req.body.agreePrivacy === "true",
        file: JSON.stringify(uploadedUrls),
        is_confirmed: false,
      };

      await ReservationSubmit.create(submitData);

      res.status(201).json({ message: "예약 상담이 등록되었습니다." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Reservation 예약 상담 전송 실패(서버)" });
    }
  },
];

exports.GetReservationSubmit = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "로그인 필요" });
  try {
    // 사용자 토큰 제작시 사용했던 ID 추출
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userID;
    const userData = await ReservationSubmit.findAll({
      where: { sns_id: userId },
    });

    return res.status(200).json({ result: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "내 신청내역 가져오기 실패(서버)" });
  }
};

exports.PostReservationDelete = async (req, res) => {
  try {
    const IdArr = req.body.deleteArray;
    await ReservationSubmit.destroy({ where: { id: IdArr } });
    res.status(200).json({ message: "삭제 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "내 신청내역 삭제하기 실패(서버)" });
  }
};

exports.GetPageCount = async (req, res) => {
  const type = req.query.type;
  const page = req.query.page;
  const token = req.cookies.token;
  // 10개로 바꾸기
  // 한페이지에 받아올 아이템 수
  const limit = 10;

  // 시작 인덱스 구하기
  const startIndex = (page - 1) * limit;

  if (!token) return res.status(401).json({ message: "로그인 필요" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userID;
    let result;
    // 문자열에 따라 다른 조건으로 데이터를 탐색한다.
    switch (type) {
      case "mySubmitList":
        result = await ReservationSubmit.count({
          where: { sns_id: userId },
        });
        TotalItems = await ReservationSubmit.findAll({
          where: { sns_id: userId },
          limit: limit,
          offset: startIndex,
          order: [["createdAt", "DESC"]],
        });
        break;

      case "AdminSubmitList":
        result = await ReservationSubmit.count();
        TotalItems = await ReservationSubmit.findAll({
          limit: limit,
          offset: startIndex,
          order: [["createdAt", "DESC"]],
        });
        break;

      case "QuestionSubmitList":
        result = await QuestionSubmit.count();
        TotalItems = await QuestionSubmit.findAll({
          limit: limit,
          offset: startIndex,
          order: [["createdAt", "DESC"]],
        });
        break;

      // case "GalleryImage":
      //   result = await GalleryImage.count();
      //   TotalItems = await GalleryImage.findAll({
      //     limit: limit,
      //     offset: startIndex,
      //   });
      //   break;

      default:
        return res.status(400).json({ message: "유효하지 않은 type" });
    }
    const NeedPage = Math.ceil(result / limit);

    return res.status(200).json({ result: NeedPage, TotalItems: TotalItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "신청 내역 개수 불러오기 실패(서버)" });
  }
};

exports.PostChangeState = async (req, res) => {
  const formId = req.body.formId;
  try {
    const getState = await ReservationSubmit.findOne({ where: { id: formId } });
    const response = await ReservationSubmit.update(
      { is_confirmed: !getState.is_confirmed },
      { where: { id: formId } }
    );

    res.status(200).json({ message: "상태가 업데이트되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "확인 상태 변경하기 실패(서버)" });
  }
};

exports.PutUpdateConfirm = async (req, res) => {
  const ids = req.body.ids;
  try {
    const response = await ReservationSubmit.update(
      { is_confirmed: true },
      { where: { id: ids } }
    );

    res.status(200).json({ success: true, updatedCount: response[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "확인 상태 변경하기 실패(서버)" });
  }
};

exports.PutUnUpdateConfirm = async (req, res) => {
  const ids = req.body.ids;
  try {
    const response = await ReservationSubmit.update(
      { is_confirmed: false },
      { where: { id: ids } }
    );
    return res.status(200).json({ success: true, updatedCount: response[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "확인 상태 변경하기 실패(서버)" });
  }
};

exports.PostQuestionSubmit = [
  upload.array("images", 100),
  async (req, res) => {
    const form = req.body;
    const token = req.cookies.token;
    const files = req.files;

    if (!token) return res.status(401).json({ message: "로그인 필요" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const uploadedUrls = [];

      // 파일 저장 > 빈 배열일 경우 그냥 통과한다.
      for (const file of files) {
        const ext = path.extname(file.originalname);
        const key = `uploads/${uuidv4()}${ext}`;

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
      const isPrivate = req.body.private === "true";
      const submitData = {
        sns_id: decoded.userID,
        nickname: form.Id,
        title: form.title,
        message: form.message,
        file: uploadedUrls,
        isPrivate: isPrivate,
        privatePWD: form.privatePWD,
        is_confirmed: false,
      };

      await QuestionSubmit.create(submitData);

      res.status(201).json({ message: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "질문 등록하기 실패(서버)" });
    }
  },
];

exports.PostMatchPassword = async (req, res) => {
  // 서버에서 게시글 불러와서 비밀번호가 같은지 확인
  const password = req.body.password;
  const postId = req.body.postId;
  try {
    const response = await QuestionSubmit.findOne({ where: { id: postId } });
    const result = response.privatePWD === password ? true : false;
    return res.status(200).json({ match: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "비밀번호 확인 실패(서버)" });
  }
};

exports.GetMatchPassword = async (req, res) => {
  // 관리자일경우 비밀번호를 불러와서 알려주기
  const postId = req.body.postId;
  const token = req.cookies.token;
  if (!token) {
    return res.json({ code: "NO_TOKEN", message: "로그인이 필요합니다." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { sns_id: decoded.userID } });
    if (user.role !== "admin") {
      return res.status(200).json({
        role: "user",
        message: "관리자 권한이 존재하지않습니다.",
      });
    }
    const response = await QuestionSubmit.findOne({ where: { id: postId } });
    if (!Number(response.isPrivate)) {
      return res.status(200).json({
        role: "admin",
        message: "이미 공개된 게시글입니다.",
      });
    }
    return res.status(200).json({
      role: "admin",
      message: "관리자 권한으로 비밀번호가 제공됩니다.",
      password: response.privatePWD,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "비밀번호 불러오기 실패(서버)" });
  }
};

exports.GetMyReservation = async (req, res) => {
  const postId = req.body.postId;
  const token = req.cookies.token;
  if (!token) {
    return res.json({ code: "NO_TOKEN", message: "로그인이 필요합니다." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await ReservationSubmit.findOne({
      where: { id: postId, sns_id: decoded.userID },
    });
    return res.status(200).json({
      result: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "비밀번호 불러오기 실패(서버)" });
  }
};

exports.GetQuestion = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await QuestionSubmit.findOne({ where: { id: postId } });
    return res.status(200).json({ result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "질문 불러오기 실패(서버)" });
  }
};
exports.GetAnswer = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await Answer.findOne({
      where: { question_id: postId },
    });
    return res.status(200).json({ result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "답변 불러오기 실패(서버)" });
  }
};

exports.PostAnswerSubmit = async (req, res) => {
  const postId = req.params.id;
  const message = req.body.message;
  const data = {
    question_id: Number(postId),
    content: message,
  };
  try {
    // 사전에 존재하던 데이터를 가져와본다.
    const prevData = await Answer.findOne({ where: { question_id: postId } });
    let result;
    // 존재 여부에 따라 업데이트 or 새로 생성
    if (prevData) {
      await Answer.update(data, { where: { question_id: postId } });
      result = await Answer.findOne({ where: { question_id: postId } });
    } else {
      result = await Answer.create(data);
    }
    // 답변 추가했으니 질문 데이터에도 답변 확인 처리 해야한다.
    await QuestionSubmit.update(
      { is_confirmed: true },
      { where: { id: postId } }
    );
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "답변 등록하기 실패(서버)" });
  }
};

exports.DeleteQuestion = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await QuestionSubmit.destroy({ where: { id: postId } });
    if (result === 0) {
      // 삭제된 row 없음
      return res
        .status(404)
        .json({ success: false, message: "존재하지 않는 질문입니다." });
    }
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "질문 삭제하기 실패 (서버)" });
  }
};

exports.GetSearch = async (req, res) => {
  const { keyword, searchField } = req.query;

  try {
    let where;
    if (searchField === "title") {
      where = keyword
        ? {
            isPrivate: false,
            [searchField]: { [Op.like]: `%${keyword}%` },
          }
        : {};
    } else {
      where = keyword
        ? {
            [searchField]: { [Op.like]: `%${keyword}%` },
          }
        : {};
    }

    const result = await QuestionSubmit.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "질문 검색하기 실패 (서버)" });
  }
};

exports.GetGalleryImgUpload = async (req, res) => {
  try {
    const slides = await GalleryImage.findAll({});
    res.status(200).json({ slides });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "갤러리 이미지 가져오기 실패 (서버)" });
  }
};

exports.PostGalleryImgUpload = [
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

      const SlideData = uploadedUrls.map((url, index) => ({
        name: files[index].originalname,
        image_url: url,
      }));

      await GalleryImage.bulkCreate(SlideData); // bulkCreate > 레코드 여러 개 한 번에 생성

      res.status(200).json({ urls: uploadedUrls });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버에서 이미지 받기 실패" });
    }
  },
];
exports.EditGalleryImgEdit = async (req, res) => {
  const newArray = req.body;
  const tx = await sequelize.transaction();
  try {
    await GalleryImage.destroy({ where: {}, transaction: tx });
    await GalleryImage.bulkCreate(newArray, { transaction: tx });
    await tx.commit();
    res.status(200).json({ message: newArray });
  } catch (err) {
    await tx.rollback();
    console.error(err);
    res.status(500).json({ message: "Gallery 슬라이드 목록 수정 실패" });
  }
};

exports.PostMainPage = [
  upload.array("images", 100),
  async (req, res) => {
    const files = req.files;
    const form = req.body;

    try {
      let Image_url;
      const uploadedUrls = [];
      if (files) {
        // 사진 파일 저장
        for (const file of files) {
          const ext = path.extname(file.originalname);

          const crypto = require("crypto");
          const hash = crypto
            .createHash("sha256")
            .update(file.buffer)
            .digest("hex");
          const key = `uploads/${hash}${ext}`;

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
      }
      let image_url = uploadedUrls[0];

      // 이미지 미 첨부시 기존 이미지 사용
      if (!image_url) {
        const existing = await MainPage.findOne({
          where: { id: 1 },
          attributes: ["image_url"],
        });
        image_url = existing?.image_url || "defaultBanner.png"; // fallback 가능
      }

      const submitData = {
        title_main: form.title1,
        title_sub: form.title2,
        content: form.message,
        image_url,
      };
      const existing = await MainPage.findOne({ where: { id: 1 } });

      if (existing) {
        await MainPage.update(submitData, { where: { id: 1 } });
      } else {
        await MainPage.create({ id: 1, ...submitData });
      }
      const updatedData = await MainPage.findOne({ where: { id: 1 } });
      res
        .status(200)
        .json({ message: "메인페이지 저장 성공", updatedData: updatedData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "메인화면 정보 수정 실패" });
    }
  },
];
exports.GetMainAbout = async (req, res) => {
  try {
    const result = await MainPage.findOne({
      where: { id: 1 },
    });
    return res.status(200).json({ result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "답변 불러오기 실패(서버)" });
  }
};

exports.GetMainGallery = async (req, res) => {
  try {
    const count = await GalleryImage.count();
    if (count === 0) {
      return res.status(200).json({ success: false }); // 불러올 사진이 없습니다.
    }
    const result = await GalleryImage.findAll({
      limit: 8,
      offset: 0,
      order: sequelize.literal("RAND()"),
      // order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "답변 불러오기 실패(서버)" });
  }
};

exports.GetGalleryPage = async (req, res) => {
  try {
    const count = await GalleryImage.count();
    if (count === 0) {
      return res.status(200).json({ success: false }); // 불러올 사진이 없습니다.
    }
    const result = await GalleryImage.findAll({});
    return res.status(200).json({ success: true, result: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "답변 불러오기 실패(서버)" });
  }
};

exports.GetGeocode = async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ error: "주소를 입력해주세요." });
  }
  try {
    const response = await axios.get(
      "https://maps.apigw.ntruss.com/map-geocode/v2/geocode",
      {
        headers: {
          "x-ncp-apigw-api-key-id": process.env.NAVER_MAP_CLIENT_ID,
          "x-ncp-apigw-api-key": process.env.NAVER_MAP_CLIENT_SECRET,
          Accept: "application/json",
        },
        params: {
          query: address,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("네이버 지오코딩 실패:", error.message);
    res.status(500).json({ error: "Geocoding failed" });
  }
};

exports.PostLocation = async (req, res) => {
  const { address, phone1, phone2, OPDays, startTime, endTime } = req.body;
  try {
    const count = await Location.count();
    if (!count) {
      await Location.create({
        address,
        phone1,
        phone2,
        op_days: OPDays,
        start_time: startTime,
        end_time: endTime,
      });
    } else {
      const existing = await Location.findOne();
      await existing.update({
        address,
        phone1,
        phone2,
        op_days: OPDays,
        start_time: startTime,
        end_time: endTime,
      });
    }
    res.status(200).json({ message: "오시는길 정보 저장 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "오시는길 정보 수정 실패(서버)" });
  }
};

exports.GetLocation = async (req, res) => {
  try {
    const existing = await Location.findOne();
    res.status(200).json({ result: existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "오시는길 정보 수정 실패(서버)" });
  }
};

exports.PostFooter = async (req, res) => {
  const { title, description } = req.body;
  try {
    const count = await Footer.count();
    if (!count) {
      await Footer.create({
        title,
        description,
      });
    } else {
      const existing = await Footer.findOne();
      await existing.update({
        title,
        description,
      });
    }
    res.status(200).json({ message: "푸터 정보 저장 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "푸터 정보 저장 실패(서버)" });
  }
};
exports.GetFooter = async (req, res) => {
  try {
    const existing = await Footer.findOne();
    res.status(200).json({ result: existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "오시는길 정보 수정 실패(서버)" });
  }
};
