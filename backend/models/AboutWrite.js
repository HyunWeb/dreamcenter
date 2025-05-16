const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const AboutWrite = sequelize.define(
    "AboutWrite",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
    },
    {
      tableName: "aboutWrite",
      timestamps: true,
      createdAt: false,
    }
  );

  return AboutWrite;
};
