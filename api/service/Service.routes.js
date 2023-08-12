const express = require("express");
const {
  getAllServices,
  getServiceDetails,
  createService,
  serviceUpdateById,
  serviceDelete,
  fetchService,
} = require("./Service.controllers");

const router = express.Router();
const passport = require("passport");
// for the image
const uploader = require("../../middlewares/uploader");

router.param("serviceId", async (req, res, next, serviceId) => {
  try {
    const foundService = await fetchService(serviceId);
    if (!foundService)
      return next({ status: 404, message: "Service not found" });
    req.service = foundService;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getAllServices);

router.get("/:serviceId", getServiceDetails);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploader.single("image"),
  createService
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  serviceUpdateById
);

router.delete(
  "/:serviceId",
  passport.authenticate("jwt", { session: false }),
  serviceDelete
);

module.exports = router;

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
//https://www.geeksforgeeks.org/express-js-req-params-property/
