const User = require("../../models/User");
const generateToken = require("../../utils/auth/generateToken");
const generateTpken = require("../../utils/auth/generateToken");
const passhash = require("../../utils/auth/passhash");
const hashPaswoord = require("../../utils/auth/passhash");

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
