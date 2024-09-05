module.exports = (sequelize, DataTypes) => {
  const UserHome = sequelize.define(
    "user_home",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      home_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "home",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  return UserHome;
};
