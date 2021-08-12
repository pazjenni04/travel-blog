const Blog = require("./Blog");
const User = require("./User");

User.hasMany(Blog, {
  foreignKey: "user_id",
});

module.exports = { Blog, User };
