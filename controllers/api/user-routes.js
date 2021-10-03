const router = require("express").Router();
const { User } = require("../../models");
const sequelize = require("../../config/connection");

//login to account
router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({ where: { email: req.body.email } });

    if (!userLogin) {
      res.status(400).json({
        message: "Email or password incorrect, please try again.",
      });
      return;
    }
    const userPassword = await userLogin.checkPassword(req.body.password);

    if (!userPassword) {
      res
        .status(400)
        .json({ message: "Email or password incorrect, please try again" });
      return;
    }

    //saves the session
    req.session.save(() => {
      req.session.loggedIn = true;
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//creates a user account
router.post("/", async (req, res) => {
  try {
    const signupData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = signupData.id;
      req.session.logged_in = true;

      res.status(200).json(orgData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//renders sign up page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

//user logout
router.post("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
