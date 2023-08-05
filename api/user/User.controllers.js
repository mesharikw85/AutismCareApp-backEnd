const User = require("../../models/User");
const generateToken = require("../../utils/auth/generateToken");
const generateTpken = require("../../utils/auth/generateToken");
const passhash = require("../../utils/auth/passhash");
const hashPaswoord = require("../../utils/auth/passhash");

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
