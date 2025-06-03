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
  PostReservationSubmit,
  getUserInfo,
  GetReservationSubmit,
  PostReservationDelete,
  GetPageCount,
  PostChangeState,
  PutUpdateConfirm,
  PutUnUpdateConfirm,
  PostQuestionSubmit,
  PostMatchPassword,
  GetQuestion,
  GetAnswer,
  PostAnswerSubmit,
  DeleteQuestion,
  GetSearch,
  GetGalleryImgUpload,
  PostGalleryImgUpload,
  EditGalleryImgEdit,
  PostMainPage,
  GetMainAbout,
} = require("../controllers/Cmain");

router.get("/user/getInfo", getUserInfo);
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
router.post("/reservation/postSubmit", PostReservationSubmit);
router.get("/reservation/getSubmit", GetReservationSubmit);
router.post("/reservation/postDelete", PostReservationDelete);
router.get("/pagecount", GetPageCount);
router.post("/AdminReservation/ChangeState", PostChangeState);
router.put("/AdminReservation/confirm", PutUpdateConfirm);
router.put("/AdminReservation/Unconfirm", PutUnUpdateConfirm);
router.post("/Question/submit", PostQuestionSubmit);
router.post("/Question/Password", PostMatchPassword);
router.get("/Question/search", GetSearch);
router.get("/Question/:id", GetQuestion);
router.get("/Answer/:id", GetAnswer);
router.post("/Answer/Submit/:id", PostAnswerSubmit);
router.delete("/Question/delete/:id", DeleteQuestion);
router.get("/gallery/imgGet", GetGalleryImgUpload);
router.post("/gallery/imgUpdate", PostGalleryImgUpload);
router.post("/gallery/imgEdit", EditGalleryImgEdit);
router.post("/Main/AboutData", PostMainPage);
router.get("/Main/GetAboutData", GetMainAbout);

module.exports = router;
