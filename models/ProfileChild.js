const { model, Schema } = require("mongoose");

const ProfileChildSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: String, required: true },
    doctorname: { type: String, required: true },
    image: { type: String, required: true },
    addresses: [
      {
        government: { type: String, required: true },
        city: { type: String, required: true },
        block: { type: String, required: true },
        street: { type: String, required: true },
        avenue: { type: String, required: true },
        house: { type: String, required: true },
        street: { type: String, required: true },
      },
    ],

    phones: [
      {
        number: "string",
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("ProfileChild", ProfileChildSchema);
