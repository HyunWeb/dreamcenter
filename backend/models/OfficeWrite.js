const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const OfficeWrite = sequelize.define(
    "OfficeWrite",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
    },
    {
      tableName: "officeWrite",
      timestamps: true,
      createdAt: false,
    }
  );

  return OfficeWrite;
};
