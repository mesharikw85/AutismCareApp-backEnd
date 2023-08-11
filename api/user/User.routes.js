const express = require("express");
const {
  signup,
  signin,
  getProfile,
  getUsers,
  fetchUser,
  updateprofile,
  createProfileChild,
  getProfileChild,
  updateprofileChild,
  deleteChildprofile,
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

//getProfile
router.get(
  "/myProfile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  getProfile
);

//updateProfile

router.put(
  "/profile/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateprofile
);

//creat profile child
router.post(
  "/addChild",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createProfileChild
);

//getProfileChild
router.get(
  "/myProfileChild",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  getProfileChild
);

//updateProfileChild

router.put(
  "/profilechild/:childId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateprofileChild
);

//delete
router.delete(
  "/myprofilechild/:childId",
  passport.authenticate("jwt", { session: false }),
  deleteChildprofile
);

module.exports = router;
