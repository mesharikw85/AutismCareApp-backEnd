const Organization = require("../../models/Organization");
const ServiceType = require("../../models/ServiceType");
const Service = require("../../models/Service");

exports.fetchOrganization = async (organizationId, next) => {
  try {
    const organization = await Organization.findById(organizationId);
    return organization;
  } catch (error) {
    return next(error);
  }
};

exports.getAllOrganizations = async (req, res, next) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    return next(error);
  }
};

exports.getOrganizationDetails = async (req, res, next) => {
  const { organizationId } = req.params;
  try {
    const foundOrganization = await Organization.findById(organizationId);
    if (!foundOrganization) {
      res.status(404).json({ message: "Organization not found!" });
    } else {
      res.status(201).json(foundOrganization);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrganization = async (req, res, next) => {
  try {
    // image file
    if (req.file) {
      //replace to replace \\ in windows to / as used in nodejs
      req.body.image = req.file.path.replace("\\", "/");
    }
    if (!req.body.image)
      return next({ status: 400, message: "no image was uploaded!" });

    const organizationExist = await Organization.findOne({
      title: req.body.title,
    });
    if (organizationExist) {
      return res.status(400).json({
        messge: "The organization you are trying to create is already exist!",
      });
    }

    const newOrganization = await Organization.create(req.body);
    await req.user.updateOne({ $push: { organizations: newOrganization._id } });
    return res.status(201).json(newOrganization);
  } catch (error) {
    return next(error);
  }
};

exports.addServiceToOrganization = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    console.log(serviceId);
    await Organization.findByIdAndUpdate(req.organization._id, {
      $push: { services: service._id },
    });
    await Service.findByIdAndUpdate(serviceId, {
      $push: { organization: req.organization._id },
    });

    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.organizationUpdateById = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace("\\", "/");
    }
    await Organization.findByIdAndUpdate(req.organization.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteOrganization = async (req, res, next) => {
  try {
    const { organizationId } = req.params;

    const organization = await Organization.findById(organizationId);

    if (organization.services.length > 0) {
      return res
        .status(401)
        .json({ message: "you can't delete this Organization!" });
    }
    await organization.deleteOne();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
