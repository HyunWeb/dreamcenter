const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ReservationSubmit = sequelize.define(
    "ReservationSubmit",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sns_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admission: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recommender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      agreePrivacy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      file: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "reservationSubmit",
      timestamps: true,
    }
  );

  return ReservationSubmit;
};
