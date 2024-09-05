module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  User.associate = (models) => {
    User.belongsToMany(models.Home, {
      through: models.UserHome,
      foreignKey: "user_id",
      otherKey: "home_id",
    });
  };

  return User;
};
