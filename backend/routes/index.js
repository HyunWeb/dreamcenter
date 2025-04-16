const express = require("express");
const router = express.Router();
const { getPosts, postLogin } = require("../controllers/Cmain");

// Get /api/post
router.get("/post", getPosts);
router.post("/naver/callback", postLogin);

module.exports = router;
