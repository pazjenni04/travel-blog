const router = require("express").Router();
const sequelize = require("../config/connection");
const { User } = require("../models");
const withAuth = require("../utils/auth");

//renders the homepage in handlebars
router.get("/", async (req, res) => {
  res.render("homepage");
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
router.get("/profile", withAuth, async (req, res) => {
  try {
    console.log(req.session.id);
    // Find the logged in user and use seesion id
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("user-profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
