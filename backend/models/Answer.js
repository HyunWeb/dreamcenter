module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      question_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "questionSubmit",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "answer",
      timestamps: true,
    }
  );

  Answer.associate = (models) => {
    Answer.belongsTo(models.QuestionSubmit, {
      foreignKey: "question_id",
      onDelete: "CASCADE",
    });
  };

  return Answer;
};
