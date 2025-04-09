const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/Cmain");

// Get /api/post
router.get("/post", getPosts);

module.exports = router;
