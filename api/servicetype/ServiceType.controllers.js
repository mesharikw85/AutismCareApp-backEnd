const ServiceType = require("../../models/ServiceType");
const Service = require("../../models/Service");

exports.fetchServiceType = async (serviceTypeId, next) => {
  try {
    const servicetype = await ServiceType.findById(serviceTypeId);
    return servicetype;
  } catch (error) {
    return next(error);
  }
};

// for the time being and we did not allow authorization -- comment isStaff when testing for Create + Update + delete

// as a staff I can create a Service -- authenticated user can not create a service

exports.createServiceType = async (req, res, next) => {
  try {
    // // need jwt passport to proceed
    // if (!req.user.isStaff) {
    //   res.status(401).json({
    //     message:
    //       " You are not Admin and not authorized to create a service type!",
    //   });
    // }

    // image file
    if (req.file) {
      //replace to replace \\ in windows to / as used in nodejs
      req.body.image = req.file.path.replace("\\", "/");
    }

    const serviceTypeExist = await ServiceType.findOne({
      category: req.body.category,
    });
    if (serviceTypeExist) {
      return res.status(400).json({ messge: "Service Type alredy exists!" });
    }
    const newServiceType = await ServiceType.create(req.body);
    await req.user.updateOne({ $push: { servicetypes: newServiceType._id } });
    return res.status(201).json(newServiceType);
  } catch (error) {
    // res.status(500).json({message: "Error: can not create a new service type", error});
    return next(error);
  }
};

exports.addServiceToServiceType = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    console.log("first");
    await ServiceType.findByIdAndUpdate(req.serviceType._id, {
      $push: { services: service._id },
    });
    await Service.findByIdAndUpdate(serviceId, {
      $push: { servicetype: req.serviceType._id },
    });

    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

// no need to be a Staff - all authenticated users can get all types of services
exports.getAllServiceTypes = async (req, res, next) => {
  try {
    const servicetypes = await ServiceType.find().populate("services");
    res.status(200).json(servicetypes);
  } catch (error) {
    // res.status(401).json({ message: "Not Found!" });
    return next(error);
  }
};

// an authenticated user can view  service Type details (title - image - description) - no need to be staff

exports.getServiceTypeDetails = async (req, res, next) => {
  const { serviceTypeId } = req.params;
  try {
    const foundServiceType = await ServiceType.findById(serviceTypeId);
    if (!foundServiceType) {
      res.status(404).json({ message: "This Type of Service is not found!" });
    } else {
      res.status(201).json(foundServiceType).select("-__v");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// as a staff: I can update a service Type by id - authenticated user can not update

exports.serviceTypeUpdateById = async (req, res, next) => {
  try {
    const { serviceTypeId } = req.params;
    if (req.file) {
      req.body.image = `$(req.file.path)`;
    }
    await ServiceType.findByIdAndUpdate(req.servicetype.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

// as astaff: I can delete a service Type by Id - an authenticated user can not delete it
exports.serviceTypeDelete = async (req, res, next) => {
  const { serviceTypeId } = req.params;
  try {
    if (!req.user.isStaff) {
      res.status(401).json({
        message:
          "You are not Admin and not authorized to delete a service type",
        error,
      });
    }
    const foundServiceType = await Service.findByIdAndDelete(serviceTypeId);

    if (!foundServiceType) {
      return res
        .status(404)
        .json({ message: "This Service Type is not found!" });
    } else {
      return res.status(204).end();
    }
  } catch (error) {
    return next(error);
  }
};
