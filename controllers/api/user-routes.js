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

//user logout
router.post("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
