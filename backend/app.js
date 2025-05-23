const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const postRoutes = require("./routes/index");
const db = require("./models");

// 배포시 수정
app.use(
  cors({
    origin: true,
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
app.use("/api", postRoutes);

// const PORT = process.env.PORT || 3001;
const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`현재 환경변수 서버 포트 :  ${PORT}`);
// });
console.log("실제 PORT 값:", PORT);

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ 서버 실행 중: 포트 ${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ 서버 실행 중 오류 발생:", err);
});
