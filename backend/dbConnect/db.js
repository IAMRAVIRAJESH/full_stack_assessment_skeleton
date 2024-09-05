const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const { db_name, db_user, db_password, port, host } = process.env;
const sequelize = new Sequelize(db_name, db_user, db_password, {
  dialect: "mysql",
  host: host,
  port: port,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected DB");
  })
  .catch(() => {
    console.log("Connection Arsad Error on DB!!");
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.js")(sequelize, DataTypes);
db.Home = require("../models/Home.js")(sequelize, DataTypes);
db.UserHome = require("../models/UserHome.js")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
