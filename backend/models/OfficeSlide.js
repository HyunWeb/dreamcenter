const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const OfficeSlide = sequelize.define(
    "OfficeSlide",
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
      tableName: "officeSlide",
      timestamps: false,
    }
  );

  return OfficeSlide;
};
