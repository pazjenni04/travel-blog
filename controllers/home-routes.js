const router = require("express").Router();

//renders the homepage in handlebars
router.get("/", async (req, res) => {
  res.render("main");
});

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

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("account", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get one blog

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
