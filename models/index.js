const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Blog, {
  foreignKey: "user_id",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
});

module.exports = { User, Blog, Comment }; //Blog
