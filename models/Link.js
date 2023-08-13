const { model, Schema } = require("mongoose");
const LinkSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    url: {},
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("Link", LinkSchema);
