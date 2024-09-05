const db = require("../dbConnect/db");

class userHomeFunction {
  async getAllUsers(req) {
    const users = await db.User.findAll();
    return users;
  }

  async getAllHomes(req) {
    const homes = await db.Home.findAll();
    return homes;
  }

  async getHomeUsers(req, res) {
    try {
      const home = await db.Home.findByPk(req.params.id, {
        include: db.User,
      });
      return home;
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getUsersHome(req, res) {
    try {
      const user = await db.User.findByPk(req.params.id, {
        include: db.Home,
      });
      return user;
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUserHome(req, res) {
    const { home_id, user_ids } = req.body;

    if (!home_id || !Array.isArray(user_ids)) {
      return res
        .status(400)
        .json({ error: "home_id and user_ids array are required." });
    }

    try {
      await db.UserHome.destroy({
        where: { home_id },
      });

      const newAssociations = user_ids.map((user_id) => ({
        home_id,
        user_id,
      }));

      await db.UserHome.bulkCreate(newAssociations);

      return { message: "User-Home associations updated successfully." };
    } catch (error) {
      console.error("Error updating User-Home associations:", error);
      res
        .status(500)
        .json({ error: "Failed to update User-Home associations." });
    }
  }
}

module.exports = userHomeFunction;
