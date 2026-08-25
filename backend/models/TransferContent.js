const { DataTypes } = require("sequelize");

// /transfer 페이지의 고정 레이아웃(H1 + 대상/절차/MOU 안내) 안에서
// admin이 문구만 개별 수정할 수 있도록 필드별로 저장한다.
// steps_body는 줄바꿈으로 구분된 편입 절차 목록(한 줄 = <li> 한 개).
module.exports = (sequelize, DataTypes) => {
  const TransferContent = sequelize.define(
    "TransferContent",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      intro: { type: DataTypes.TEXT, allowNull: true },
      eligibility_body: { type: DataTypes.TEXT, allowNull: true },
      steps_body: { type: DataTypes.TEXT, allowNull: true },
      procedure_note: { type: DataTypes.TEXT, allowNull: true },
      mou_notice_body: { type: DataTypes.TEXT, allowNull: true },
      contact_note: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "transferContent",
      timestamps: true,
      createdAt: false,
    }
  );

  return TransferContent;
};
