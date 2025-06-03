module.exports = (sequelize, DataTypes) => {
  const GalleryImage = sequelize.define(
    "GalleryImage",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "galleryImages",
      timestamps: false,
    }
  );

  return GalleryImage;
};
