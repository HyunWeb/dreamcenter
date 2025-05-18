const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const postRoutes = require("./routes/index");
const db = require("./models");

// 배포시 수정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://13.124.176.128:82"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
db.sequelize
  .sync({ force: false }) // force: true면 기존 테이블 삭제 후 재생성
  .then(() => {
    console.log("MySQL 연결 성공");
  })
  .catch((err) => {
    console.error("MySQL 연결 실패", err);
  });

// API 라우터 연결
app.use("/", postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
