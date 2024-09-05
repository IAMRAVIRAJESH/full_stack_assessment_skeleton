const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const UserHomeService = require("../controllers/userHomeController");
const UserHome = new UserHomeService();

app.get("/user/find-all", async (req, res) => {
  try {
    const call = await UserHome.getAllUsers(req);
    return res.send(call);
  } catch (error) {
    console.error(error);
    return response(error.statusCode, { message: error.message });
  }
});

app.get("/home/find-all", async (req, res) => {
  try {
    const call = await UserHome.getAllHomes(req);
    return res.send(call);
  } catch (error) {
    console.error(error);
    return response(error.statusCode, { message: error.message });
  }
});

app.get("/home/find-by-user/:id", async (req, res) => {
  try {
    const call = await UserHome.getUsersHome(req);
    return res.send(call);
  } catch (error) {
    console.error(error);
    return response(error.statusCode, { message: error.message });
  }
});

app.get("/user/find-by-home/:id", async (req, res) => {
  try {
    const call = await UserHome.getHomeUsers(req);
    return res.send(call);
  } catch (error) {
    console.error(error);
    return response(error.statusCode, { message: error.message });
  }
});

app.put("/home/update-users", async (req, res) => {
  try {
    const call = await UserHome.updateUserHome(req);
    return res.send(call);
  } catch (error) {
    console.error(error);
    return response(error.statusCode, { message: error.message });
  }
});
