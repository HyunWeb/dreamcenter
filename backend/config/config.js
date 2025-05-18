require("dotenv").config();

const development = {
  username: process.env.DB_USER_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_NAME_DEV,
  host: process.env.DB_HOST_DEV,
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT,
  timezone: process.env.DB_TIMEZONE,
  logging: console.log,
};

const test = {};
const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT,
  timezone: process.env.DB_TIMEZONE,
  logging: console.log,
};

module.exports = { production };
