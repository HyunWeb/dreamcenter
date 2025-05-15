const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const AboutSlide = sequelize.define(
    "AboutSlide",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "aboutSlice",
      timestamps: false,
    }
  );

  return AboutSlide;
};
