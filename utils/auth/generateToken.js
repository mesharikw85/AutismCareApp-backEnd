const jwt = require("jsonwebtoken");
const config = require("../../config/Keys");

module.exports = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_EXP,
  });
  return token;
};

//https://www.npmjs.com/package/jsonwebtoken
//npm install jsonwebtoken
