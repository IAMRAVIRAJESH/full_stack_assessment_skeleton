const {UserModel} = require('../models/user');
const {HomeModel} = require('../models/home');
const {UserHomeModel} = require('../models/userHome');
const db = require('../dbConnect/db')
class userHomeFunction {
    async getAllUsers(req){
        const users = await UserModel.findAll();
        return users;
    }

    async getHomeUsers (req, res){
      try {
          const home = await db.Home.findByPk(req.body.id, {
              include: db.User
          });
          res.status(200).json(home);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  };
  async getUsersHome (req, res) {
      try {
          const user = await db.User.findByPk(req.body.id, {
              include: db.Home
          });
          return user;
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  };

    async updateUserHome(req, res){
      const { home_id, user_ids } = req.body;

      if (!home_id || !Array.isArray(user_ids)) {
        return res.status(400).json({ error: 'home_id and user_ids array are required.' });
      }
    
      try {
        // Step 1: Remove all existing user-home associations for the given home_id
        await UserHomeModel.destroy({
          where: { home_id }
        });
    
        // Step 2: Create new user-home associations with the provided user_ids array
        const newAssociations = user_ids.map(user_id => ({
          home_id,
          user_id
        }));
    
        await UserHomeModel.bulkCreate(newAssociations);
    
        res.status(200).json({ message: 'User-Home associations updated successfully.' });
      } catch (error) {
        console.error('Error updating User-Home associations:', error);
        res.status(500).json({ error: 'Failed to update User-Home associations.' });
      }
    }
};

module.exports = userHomeFunction;