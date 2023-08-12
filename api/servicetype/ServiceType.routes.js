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
const ServiceType = require("../../models/ServiceType");
const passport = require("passport");
// for the image
const uploader = require("../../middlewares/uploader");

router.param("serviceTypeId", async (req, res, next, serviceTypeId) => {
  try {
    // const foundServiceType = await fetchServiceType(serviceTypeId, next);
    // if (!foundServiceType) {
    //   return next({ status: 404, message: "Service Type not found!" });
    // }
    // req.serviceType = foundServiceType;
    // next();

    const serviceType = await ServiceType.findById(serviceTypeId);
    if (!serviceType)
      return next({ status: 404, message: "Service Type not found!" });

    req.serviceType = serviceType;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", getAllServiceTypes);
// router.get("/:serviceTypeID", getServiceTypeDetails);
router.get("/:serviceTypeId", getServiceTypeDetails);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  createServiceType
);

router.put(
  "/:serviceTypeId",
  passport.authenticate("jwt", { session: false }),
  serviceTypeUpdateById
);
router.delete(
  "/:serviceTypeId",
  passport.authenticate("jwt", { session: false }),
  serviceTypeDelete
);

router.post(
  "/:serviceId/:serviceTypeId",
  passport.authenticate("jwt", { session: false }),
  addServiceToServiceType
);
// router.post("/:serviceTypeId/:serviceId", addServiceToServiceType);
module.exports = router;
