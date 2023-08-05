const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    language: { type: String, required: true },
    image: {
      type: String,
      default: "/",
    },
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
    isStaff: { type: Boolean, default: false },
    // relations
    phone: { type: Schema.Types.ObjectId, ref: "PhoneNumber" },
    child: { type: Schema.Types.ObjectId, ref: "ProfileChild" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

const { model, Schema } = require("mongoose");
