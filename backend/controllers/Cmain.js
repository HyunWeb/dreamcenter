const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

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
