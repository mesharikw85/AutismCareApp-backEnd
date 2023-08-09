const express = require("express");
const {
  signup,
  signin,
  getProfile,
  getUsers,
  fetchUser,
  updateprofile,
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
router.get(
  "/myProfile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),

  updateprofile
);
module.exports = router;
