const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const MainPage = sequelize.define(
    "MainPage",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title_main: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "해외 의대 전문 유학원",
      },
      title_sub: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "드림유학원, 당신의 글로벌 미래를 응원합니다.",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "2020 ~ 2025 우즈베키스탄 의대 전체 수속 학생수 1위",
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "defaultBanner.png",
      },
    },
    {
      tableName: "mainPage",
      timestamps: false,
    }
  );

  return MainPage;
};
