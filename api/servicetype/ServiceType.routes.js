const express = require("express");

const {
  createServiceType,
  getAllServiceTypes,
  getServiceTypeDetails,
  serviceTypeUpdateById,
  serviceTypeDelete,
  addServiceToServiceType,
  fetchServiceType,
} = require("./ServiceType.controllers");
const router = express.Router();
const passport = require("passport");
// for the image
const uploader = require("../../middlewares/uploader");

router.param("serviceTypeId", async (req, res, next, serviceTypeId) => {
  try {
    const foundServiceType = await fetchServiceType(serviceTypeId, next);
    if (!foundServiceType) {
      return next({ status: 404, message: "Service Type not found!" });
    }
    req.serviceType = foundServiceType;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", getAllServiceTypes);
router.get("/:serviceTypeID", getServiceTypeDetails);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  createServiceType
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  serviceTypeUpdateById
);
router.delete(
  "/:serviceTypeId",
  passport.authenticate("jwt", { session: false }),
  serviceTypeDelete
);

router.post("/:serviceId/:serviceTypeId", addServiceToServiceType);
// router.post("/:serviceTypeId/:serviceId", addServiceToServiceType);
module.exports = router;
