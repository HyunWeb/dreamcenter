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
  PostOfficeImgUpload,
  GetAboutImgUpload,
  GetOfficeImgUpload,
  EditAboutImgUpload,
  EditOfficeImgUpload,
  PostAboutWrite,
  PostOfficeWrite,
  GetAboutWrite,
  GetOfficeWrite,
} = require("../controllers/Cmain");

router.post("/naver/callback", postLogin);
router.post("/auth/logout", postLogout);
router.post("/upload", postUpload);
router.get("/rss", getNews);
router.post("/about/imgUpdate", PostAboutImgUpload);
router.post("/office/imgUpdate", PostOfficeImgUpload);
router.get("/about/imgGet", GetAboutImgUpload);
router.get("/office/imgGet", GetOfficeImgUpload);
router.post("/about/imgEdit", EditAboutImgUpload);
router.post("/office/imgEdit", EditOfficeImgUpload);
router.post("/about/postWrite", PostAboutWrite);
router.post("/office/postWrite", PostOfficeWrite);
router.get("/about/getWrite", GetAboutWrite);
router.get("/office/getWrite", GetOfficeWrite);

module.exports = router;
