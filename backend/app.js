const express = require("express");
const cors = require("cors");
const app = express();
const postRoutes = require("./routes/index");

app.use(cors());
app.use(express.json());

// API 라우터 연결
app.use("/api", postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
