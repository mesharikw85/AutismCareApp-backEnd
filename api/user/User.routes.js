const express = require("express");
const {
  signup,
  signin,
  getProfile,
  getUsers,
  fetchUser,
} = require("./User.controllers");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middlewares/uploader");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.foundUser = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

//getuser
router.get("/", getUsers);

//getrofile
router.get("/profile/:userId", getProfile);

module.exports = router;
