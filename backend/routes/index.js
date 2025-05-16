const express = require("express");
const router = express.Router();
const {
  getPosts,
  postLogin,
  getLogin,
  postLogout,
  postUpload,
  getNews,
  PostAboutImgUpload,
  GetAboutImgUpload,
  EditAboutImgUpload,
  PostAboutWrite,
  GetAboutWrite,
} = require("../controllers/Cmain");

router.post("/naver/callback", postLogin);
router.post("/auth/logout", postLogout);
router.post("/upload", postUpload);
router.get("/rss", getNews);
router.post("/about/imgUpdate", PostAboutImgUpload);
router.get("/about/imgGet", GetAboutImgUpload);
router.post("/about/imgEdit", EditAboutImgUpload);
router.post("/about/postWrite", PostAboutWrite);
router.get("/about/getWrite", GetAboutWrite);

module.exports = router;
