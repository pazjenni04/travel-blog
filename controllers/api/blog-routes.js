const router = require("express").Router();
const { Blog } = require("../../models");

//render one blog by title
router.get("/blog/:id", async (req, res) => {
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
router.delete("/blog/:id", async (req, res) => {
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
