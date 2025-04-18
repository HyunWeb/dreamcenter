const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")["development"];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    // 각 모델 js들 불러와서 경로 명시해서 실행 시킨다. > 매개변수 전달
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    // 빈 db 객체에 한번에 연결 할 수 있도록 모델들을 연결 정리해둔다.
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
