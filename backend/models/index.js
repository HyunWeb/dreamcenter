const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js")["production"];
// const config = require(__dirname + "/../config/config.js")["development"];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    retry: {
      max: 10, // 최대 재시도 횟수
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000, // 최대 30초까지 연결 대기
      idle: 10000,
    },
  }
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

// ✅ 여기서 각 모델의 associate 메서드를 호출해 모델 간 관계를 연결
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
