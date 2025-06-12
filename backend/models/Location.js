const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      op_days: {
        type: DataTypes.ENUM("평일", "주말", "연중무휴"),
        allowNull: false,
      },
      start_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "location",
      timestamps: true,
    }
  );

  return Location;
};
