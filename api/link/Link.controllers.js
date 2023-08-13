const Link = require("../../models/Link");

exports.links = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.like = async (req, res, next) => {
  try {
    const like = await Link.findByIdAndUpdate(
      req.body.linkId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.json(link);
  } catch (error) {
    return next(error);
  }
};

exports.unlike = async (req, res, next) => {
  try {
    const like = await Link.findByIdAndUpdate(
      req.body.linkId,
      { $pull: { likes: req.user._id } }, //pull out the link from the likeUnlike array
      { new: true }
    );
    res.json(link);
  } catch (error) {
    return next(error);
  }
};

// $addToSet : to push the like link to the likeunlike array and user can send like only once
// new:true ===> is used to make sure that the user can send like Once only
