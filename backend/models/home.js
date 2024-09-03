module.exports = (sequelize, DataTypes) => {
    const Home = sequelize.define('home', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        street_address: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: null
        },
        state: {
          type: DataTypes.STRING(50),
          allowNull: true,
          defaultValue: null
        },
        zip: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null
        },
        sqft: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null
        },
        beds: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null
        },
        baths: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: null
        },
        list_price: {
          type: DataTypes.FLOAT,
          allowNull: true,
          defaultValue: null
        }
      },
      {
        timestamps: false,
        freezeTableName: true,
      });      

  Home.associate = (models) => {
      Home.belongsToMany(models.User, {
          through: models.UserHome, // Use the model instance directly
          foreignKey: 'home_id',
          otherKey: 'user_id'
      });
  };

  return Home;
};