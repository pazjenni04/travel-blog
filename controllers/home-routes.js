const router = require("express").Router();
const session = require("express-session");
const sequelize = require("../config/connection");
const { User } = require("../models");
const withAuth = require("../utils/auth");

//renders the homepage in handlebars
router.get("/", async (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Use withAuth middleware to prevent access to route
router.get("/profile", async (req, res) => {
  console.log("WTF");
  try {
    console.log(req.session.id);
    // Find the logged in user and use seesion id
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ["password"] },
    });

    // const user = userData.get({ plain: true });

    const mockupData = {
      id: 4,
      username: "luna1234",
      email: "luna1234@gmail.com",
      password: "password123",
    };
    res.render("userprofile", {
      // ...user,
      mockupData,
      logged_in: true,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
