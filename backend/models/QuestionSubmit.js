const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const QuestionSubmit = sequelize.define(
    "QuestionSubmit",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      sns_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING, // QustionUserId
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      file: {
        type: DataTypes.JSON, // 문자열 배열 저장 시 JSON 사용
        allowNull: true,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      privatePWD: {
        type: DataTypes.STRING(4), // 4자리 문자열
        allowNull: true,
        defaultValue: null,
      },
      is_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "questionSubmit",
      timestamps: true,
    }
  );

  return QuestionSubmit;
};
