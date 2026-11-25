const jwt = require("jsonwebtoken");
const { User } = require("../models");

// 쿠키의 JWT를 검증하고, 토큰의 userID로 DB의 사용자를 찾는다.
// 토큰이 없거나 만료·위조됐거나 사용자가 없으면 null.
const findUserFromToken = async (req) => {
  const token = req.cookies?.token;
  if (!token) return null;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }

  return User.findOne({ where: { sns_id: decoded.userID } });
};

const LOGIN_REQUIRED = {
  code: "LOGIN_REQUIRED",
  message: "로그인이 필요합니다. 다시 로그인해 주세요.",
};

// 로그인한 사용자만 통과. 이후 핸들러에서 req.user로 사용자에 접근한다.
const requireLogin = async (req, res, next) => {
  try {
    const user = await findUserFromToken(req);
    if (!user) return res.status(401).json(LOGIN_REQUIRED);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "로그인 확인 실패(서버)" });
  }
};

// 관리자(role === "admin")만 통과. admin 여부는 토큰이 아니라 DB 기준으로 판단한다.
const requireAdmin = async (req, res, next) => {
  try {
    const user = await findUserFromToken(req);
    if (!user) return res.status(401).json(LOGIN_REQUIRED);
    if (user.role !== "admin") {
      return res.status(403).json({
        code: "ADMIN_REQUIRED",
        message: "관리자 권한이 필요합니다.",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "관리자 확인 실패(서버)" });
  }
};

module.exports = { requireLogin, requireAdmin };
