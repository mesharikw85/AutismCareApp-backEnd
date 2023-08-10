const User = require("../../models/User");
const ChildProfile = require("../../models/ProfileChild");
const generateToken = require("../../utils/auth/generateToken");
const generateTpken = require("../../utils/auth/generateToken");
const passhash = require("../../utils/auth/passhash");

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return next(error);
  }
};

//1- signup - register (firstname, lastname,username,password,confirmpassword,email,language)

exports.signup = async (req, res, next) => {
  try {
    //over and hash password
    req.body.password = await passhash(req.body.password);
    //create user
    const newUser = await User.create(req.body);
    //generate Token
    const token = generateTpken(newUser);
    //return token
    res.status(201).json({ message: "You are Registered now!", token });
  } catch (error) {
    return next(error);
  }
};

//2 - signin - (username, password, token expiration)
exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-__v -password -email");
    return res.status(200).json(users);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    console.log("first");
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.updateprofile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.file.path.replace("\\", "/")}`;
    }

    const newUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    console.log({ newUser, old: req.user });
    console.log(req.body);
    return res.status(204).end();
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

//profilechild
exports.createProfileChild = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.file.path.replace("\\", "/")}`;
    }
    if (!req.body.image)
      return next({ status: 400, message: "no image was uploaded!" });
    const newChild = await ChildProfile.create(req.body);
    res.status(201).json(newChild);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

//getProfileChild
exports.getProfileChild = async (req, res, next) => {
  try {
    // Fetch child profiles using ChildProfile model
    const childProfiles = await ChildProfile.find().select(
      "-__v -password -email"
    );

    // Sending the fetched child profiles as a JSON response
    return res.status(200).json(childProfiles);
  } catch (error) {
    next(error);
  }
};

exports.updateprofileChild = async (req, res, next) => {
  try {
    const updatedData = req.body;

    if (req.file) {
      updatedData.image = req.file.path.replace("\\", "/");
    }

    // Find the child profile by ID and update it
    const updatedChild = await ChildProfile.findByIdAndUpdate(
      req.user._id, // Assuming req.user._id contains the correct user ID
      updatedData,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedChild) {
      // If updatedChild is null, the profile was not found
      return res.status(404).json({ error: "Child profile not found." });
    }

    console.log("Updated Child:", updatedChild);
    return res.status(200).json(updatedChild);
  } catch (error) {
    console.error("Error updating child profile:", error);
    return res.status(400).json({ error: "Failed to update child profile." });
  }
};
