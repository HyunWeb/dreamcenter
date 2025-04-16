const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getPosts = (req, res) => {
  res.status(200).json({ message: "Post list fetched successfully!" });
};

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
    console.log("유저데이타", userData);
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
    res.status(200).json({ message: "로그인 성공", user: userData });

    // 로그인 처리 (세션 저장, 토큰 발급 등)
    // res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "로그인 실패" });
  }
};
