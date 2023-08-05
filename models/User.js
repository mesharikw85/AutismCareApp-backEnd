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
    // relations
    phone: { type: Schema.Types.ObjectId, ref: "PhoneNumber" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
