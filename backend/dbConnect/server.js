const express = require('express');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

const UserHomeService = require('../controllers/userHomeController');
const UserHome = new UserHomeService();

app.get('/user/find-all', async (req, res)=> {
  try {
      const call = await UserHome.getAllUsers(req)
      return res.send(call);
  } catch (error) {
      console.error(error);
      return response(error.statusCode, { message: error.message });
  }
  
});

app.get('/home/find-by-user', async (req, res)=> {
  try {
      const call = await UserHome.getUsersHome(req)
      return res.send(call);
  } catch (error) {
      console.error(error);
      return response(error.statusCode, { message: error.message });
  }
  
});

app.get('/user/find-by-home', async (req, res)=> {
  try {
      const call = await UserHome.getUsersByHome(req)
      return res.send(call);
  } catch (error) {
      console.error(error);
      return response(error.statusCode, { message: error.message });
  }
  
});

app.put('/home/update-users', async (req, res)=> {
  try {
      const call = await UserHome.updateUserHome(req)
      return res.send(call);
  } catch (error) {
      console.error(error);
      return response(error.statusCode, { message: error.message });
  }
  
});