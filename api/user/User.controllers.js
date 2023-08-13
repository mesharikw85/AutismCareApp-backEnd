const User = require("../../models/User");
const ChildProfile = require("../../models/ProfileChild");
const generateToken = require("../../utils/auth/generateToken");
const generateTpken = require("../../utils/auth/generateToken");
const passhash = require("../../utils/auth/passhash");
const ProfileChild = require("../../models/ProfileChild");

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
    const users = await User.find()
      .select("-__v -password -email")
      .populate("child");
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
    // if (!req.body.image)
    //   return next({ status: 400, message: "no image was uploaded!" });
    const newChild = await ChildProfile.create(req.body);
    // Associate the child profile with the user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { child: newChild._id },
    });

    // Associate the user with the child profile
    await ProfileChild.findByIdAndUpdate(newChild._id, {
      user: req.user._id,
    });

    res.status(201).json(newChild);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

//getProfileChild
exports.getProfileChild = async (req, res, next) => {
  try {
    // Fetch child profiles using ChildProfile model
    const childProfiles = await ChildProfile.find()
      .select("-__v -password -email")
      .populate("user");

    // Sending the fetched child profiles as a JSON response
    return res.status(200).json(childProfiles);
  } catch (error) {
    next(error);
  }
};

exports.updateprofileChild = async (req, res, next) => {
  try {
    console.log(req.body);
    const { childId } = req.params;
    if (req.file) {
      req.body.image = `${req.file.path}`;
    }
    const child = await ChildProfile.findById(childId);
    // console.log(child.user.toString());
    // console.log(req.user._id.toString());
    if (!child) {
      res.status(404).json({ message: "child not found" });
    } else {
      await child.updateOne({
        ...req.body,
        image: req.body.image,
      });
      const a = await ChildProfile.findById(child._id);
      // console.log(a);
      return res.status(200).json({ message: "child is updated" });
    }
  } catch (error) {
    next(error);
  }
};

//delete

exports.deleteChildprofile = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const child = await ChildProfile.findById(childId);
    console.log(child.user.toString());
    console.log(req.user._id.toString());
    if (!child) {
      res.status(404).json({ message: "child not found" });
    } else {
      await child.updateOne({
        firstname: req.body.username,
        image: req.body.image,
      });
      const a = await ChildProfile.findByIdAndRemove(child._id);
      console.log(a);
      return res.status(200).json({ message: "child is delete" });
    }
  } catch (error) {
    next(error);
  }
};

// exports.deleteUser = async (req, res, next) => {
//   try {
//     if (!req.user._id.equals(req.foundUser._id))
//       return next({
//         status: 400,
//         message: "you dont have the permission to preform this task!",
//       });
//     await User.findByIdAndRemove({ _id: req.user.id });
//     return res.status(204).end();
//   } catch (error) {
//     return next({ status: 400, message: error.message });
//   }
// };
