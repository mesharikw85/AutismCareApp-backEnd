const { model, Schema } = require("mongoose");

const childProfileSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: String, required: ture },
    doctorname: [{ type: String, required: true }],
    image: {
      type: String,
      default: "/",
    },
    phones: [
      {
        tags: ["string"],
        number: "string",
        remark: "string",
      },
    ],
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

    // relations
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("ChildProfile", childProfileSchema);
