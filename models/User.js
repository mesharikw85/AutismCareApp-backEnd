const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    nationality: { type: String, required: true },
    phone: { type: Schema.Types.ObjectId, ref: "PhoneNumber" },

    // image: {
    //   type: String,
    //   default: "media/1690210343852cool-profile.jpeg",
    // },
    // bio: { type: String },

    // relations
    // trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    // countries: [{ type: Schema.Types.ObjectId, ref: "Country" }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
