const { model, Schema } = require("mongoose");

const ProfileChildSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: String, required: true },
    doctorname: { type: String, required: true },
    image: { type: String, required: true },

    numbers: Number,
  },
  { timestamps: true }
);

module.exports = model("ProfileChild", ProfileChildSchema);
