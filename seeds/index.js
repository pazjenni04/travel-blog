const sequelize = require("../config/connection");
const { Blog, User, Comment } = require("../models");

const userData = require("./user-seeds.json");
const blogData = require("./blog-seeds.json");
const commentData = require("./comment-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blog = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
