const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // 데이터베이스 이름
  process.env.DB_USER, // 유저명
  process.env.DB_PASSWORD, // 비밀번호
  {
    // options 객체
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING,
    timezone: process.env.DB_TIMEZONE,
  }
);

module.exports = sequelize;
