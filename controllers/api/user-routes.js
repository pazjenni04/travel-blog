const router = require("express").Router();
const User = require("../../models/User");

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
  } catch (err) {
    res.status(400).json(err);
  }
  // req.session.save(() => {
  //   req.session.user
  // })
});

//router to get one user
// router.get("/user/:id", async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.params.id);

//     if (!userDate) {
//       res
//         .status(404)
//         .json({ message: "No user with this id.  Please try again." });
//       return;
//     }
//     const user = userData.get({ plain: true });
//     res.render("account", user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//user logout
router.post("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
