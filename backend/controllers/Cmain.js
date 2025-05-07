const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
