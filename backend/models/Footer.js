const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Footer = sequelize.define(
    "Footer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "footer",
      timestamps: true,
    }
  );

  return Footer;
};
