const router = require("express").Router();
const User = require("../../models/User");

//router to get one user
router.get("/user/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    if (!userDate) {
      res
        .status(404)
        .json({ message: "No user with this id.  Please try again." });
      return;
    }
    const user = userData.get({ plain: true });
    res.render("account", user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
