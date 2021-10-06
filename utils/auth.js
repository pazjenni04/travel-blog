//checks if user is logged in if not will be redirected to login page

// AUTH: Maybe Week 14 Activity 23????
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
