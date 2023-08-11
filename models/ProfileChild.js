const { model, Schema } = require("mongoose");

const ProfileChildSchema = new Schema(
  {
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    birthday: { type: String, required: false },
    doctorname: { type: String, required: false },
    image: { type: String, required: false },
    phones: String,
    addresses: String,
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("ProfileChild", ProfileChildSchema);
