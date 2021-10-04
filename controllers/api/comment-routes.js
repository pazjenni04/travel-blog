const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

//will render all comments
router.get("/", withAuth, async (req, res) => {
  try {
    const allComments = await Comment.findAll({
      include: { all: true, nested: true },
    });

    const commentData = allComments.map((input) => input.get({ plain: true }));
    res.render("blog", {
      commentData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//creates a new comment
router.post("/post", withAuth, async (req, res) => {
  try {
    const addedComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(addedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//removes a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const removeComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!removeComment) {
      res.status(404).json({ message: "Comment does not exist" });
      return;
    }

    res.status(200).json(removeComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//updates a comment
router.put("/update", async (req, res) => {
  try {
    const updateComment = await Comment.update(
      {
        content: req.body.content,
      },
      { where: { id: req.params.id } }
    );

    const commentsData = await Comment.findAll({
      where: { user_id: req.session.user_id },
    });

    const comments = commentsData.map((input) => input.get({ plain: true }));

    res.render("blog", { comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
