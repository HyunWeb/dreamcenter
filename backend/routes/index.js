const express = require("express");
const router = express.Router();
const {
  getPosts,
  postLogin,
  getLogin,
  postLogout,
} = require("../controllers/Cmain");

router.post("/naver/callback", postLogin);
router.post("/auth/logout", postLogout);

module.exports = router;
