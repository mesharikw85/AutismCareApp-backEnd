const Service = require("../../models/Service");

// no need to be a Staff - all authenticated users can getAllservices
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    // res.status(401).json({ message: "No Services Found!" });
    return next(error);
  }
};

// an authenticated user can view service's details (all fields in user model)

exports.getServiceDetails = async (req, res, next) => {
  const { serviceID } = req.params;
  try {
    const foundService = await Service.findById(serviceID);
    if (!foundService) {
      res.status(404).json({ message: "Service not found!" });
    } else {
      res.status(201).json(foundService).select("-__v");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for the time being and we did not allow authorization -- comment isStaff when testing for Create + Update + delete

// as a staff I can create a Service -- authenticated user can not create a service
// for the time being and we did not allow authorization -- comment isStaff when testing

exports.createService = async (req, res, next) => {
  try {
    // need jwt passport to proceed
    if (!req.user.isStaff) {
      res.status(401).json({
        message: " You are not Admin and not authorized to create a service!",
        error,
      });
    }

    // image file
    if (req.file) {
      //replace to replace \\ in windows to / as used in nodejs
      req.body.image = req.file.path.replace("\\", "/");
    }
    if (!req.body.image)
      return next({ status: 400, message: "no image was uploaded!" });

    const serviceExist = await Service.findOne({
      servicetitle: req.body.servicetitle,
    });
    if (serviceExist) {
      return res.status(400).json({
        messge: "The service you are trying to create is already exist!",
      });
    }

    const newService = await Service.create(req.body);
    await req.user.updateOne({ $push: { services: newService._id } });
    return res.status(201).json(newService);
  } catch (error) {
    // res.status(500).json({message: "Error: can not create a new service", error});
    return next(error);
  }
};

// as a staff: I can update a service by id - authenticated user can not update

exports.serviceUpdateById = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }
    await Service.findByIdAndUpdate(req.service.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

// as astaff: I can delete a service by Id - an authenticated user can not delete a service
exports.serviceDelete = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    // if (!req.user.isStaff) {
    //   res.status(401).json({
    //     message: "You are not Admin and not authorized to delete a service",
    //     error,
    //   });
    // }
    const foundService = await Service.findByIdAndDelete(serviceId);

    if (!foundService) {
      return res.status(404).json({ message: "Service is not found!" });
    } else {
      return res.status(204).json({ message: "Service is deleted!" });
    }
  } catch (error) {
    return next(error);
  }
};

//https://www.npmjs.com/package/express-fileupload