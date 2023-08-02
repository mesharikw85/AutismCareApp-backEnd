const User = require("../../models/User");
const generateTpken = require("../../utils/auth/generateToken");
const hashPaswoord = require("../../utils/auth/hasshash");

exports.signup = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.profileImage = `${req.file.path}`;
    // }
    //over and hash password
    req.body.password = await hashPaswoord(req.body.password);
    //create user
    const newUser = await User.create(req.body);
    //creat tpken
    const token = generateTpken(newUser);
    //return token
    res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    console.log(req.user);
    const token = generateTpken(req.user);

    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};
