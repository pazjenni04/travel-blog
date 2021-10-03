const router = require("express").Router();
const Blog = require("../../models/Blog");
const sequelize = require("../../config/connection");

//renders all posted blogs
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Blog,
        },
      ],
    });

    const blogs = blogData.map((input) => input.get({ plain: true }));
    res.render("blog", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//render one blog by title
router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: { title: req.body.title },
    });

    //rendering blogs on blog hb
    const blogs = blogData.get({ plain: true });
    res.render("blog", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

//deletes blog
router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    //if blog doesn't exist, will message
    if (!blogData) {
      res.status(400).json({ message: "Blog title does not exist" });
    }
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
