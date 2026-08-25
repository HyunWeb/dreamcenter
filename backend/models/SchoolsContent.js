const { DataTypes } = require("sequelize");

// /schools 페이지의 고정 레이아웃(H1 + 도시별 H2 3섹션 + 통계 박스) 안에서
// admin이 문구만 개별 수정할 수 있도록 필드별로 저장한다.
module.exports = (sequelize, DataTypes) => {
  const SchoolsContent = sequelize.define(
    "SchoolsContent",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      intro: { type: DataTypes.TEXT, allowNull: true },
      tashkent_body: { type: DataTypes.TEXT, allowNull: true },
      samarkand_body: { type: DataTypes.TEXT, allowNull: true },
      andijan_body: { type: DataTypes.TEXT, allowNull: true },
      stat_body: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "schoolsContent",
      timestamps: true,
      createdAt: false,
    }
  );

  return SchoolsContent;
};
