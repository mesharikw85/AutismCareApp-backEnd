const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    email: { type: String, required: true },

    language: { type: String, required: false },
    image: {
      type: String,
      default: "/",
    },
    addresses: [
      {
        government: { type: String, required: false },
        city: { type: String, required: false },
        block: { type: String, required: false },
        street: { type: String, required: false },
        avenue: { type: String, required: false },
        house: { type: String, required: false },
        street: { type: String, required: false },
      },
    ],
    // relations
    phone: { type: Schema.Types.ObjectId, ref: "PhoneNumber" },

    child: { type: Schema.Types.ObjectId, ref: "ProfileChild" },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
