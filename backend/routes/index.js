const express = require("express");
const router = express.Router();
const {
  getPosts,
  postLogin,
  getLogin,
  postLogout,
  postUpload,
  getNews,
} = require("../controllers/Cmain");

router.post("/naver/callback", postLogin);
router.post("/auth/logout", postLogout);
router.post("/upload", postUpload);
router.get("/rss", getNews);

module.exports = router;
