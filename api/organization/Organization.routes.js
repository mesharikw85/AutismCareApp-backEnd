const express = require("express");
const {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,
  addServiceToOrganization,
  fetchOrganization,
} = require("./Organization.controllers");

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
// router.get("/:serviceTypeId", getServiceTypeDetails);

router.get("/:organizationId", getOrganizationDetails);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  createOrganization
);

router.post(
  "/:serviceId/:organizationId",
  passport.authenticate("jwt", { session: false }),
  addServiceToOrganization
);

module.exports = router;
