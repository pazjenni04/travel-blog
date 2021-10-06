const router = require("express").Router();
const Blog = require("../../models/Blog");
const sequelize = require("../../config/connection");

//renders all posted blogs
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: { all: true, nested: true },
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

//creates a new blog post
router.post("/", async (req, res) => {
  console.log("WHAT ARE YOU DOING");
  try {
    const blogData = await Blog.create({ ...req.body });

    req.session.save(() => {
      req.session.user_id = blogData.id;
      req.session.logged_in = true;

      res.status(200).json(blogData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//updates one blog and updates
router.put("/:id", async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: { title: req.body.title, user_id: req.session.user_id },
      }
    );

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
