const express = require("express");
const {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,

  fetchOrganization,
} = require("./api/Organization.controllers");

const router = express.Router();

const passport = require("passport");
// for the image
const uploader = require("../../middlewares/uploader");

router.param("organizationId", async (req, res, next, organizationId) => {
  try {
    const foundOrganization = await fetchOrganization(organizationId);
    if (!foundOrganization)
      return next({ status: 404, message: "Organization not found" });
    req.organization = foundOrganization;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getAllOrganizations);

router.get("/:organizationId", getOrganizationDetails);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  createOrganization
);
