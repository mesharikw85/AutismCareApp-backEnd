const express = require("express");
const router = express.Router;
const { like, unlike } = require("../../api/link");
router.post("links", passport.authenticate("jwt", { session: false }), links);
router.put("/like", passport.authenticate("jwt", { session: false }), like);
router.put("/unlike", passport.authenticate("jwt", { session: false }), unlike);
