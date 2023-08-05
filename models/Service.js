const { model, Schema } = require("mongoose");
const serviceSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true, default: "/" },
    description: { type: String, required: true },
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
      required: false,
    },
    email: { type: String, required: true },
    phonenumber: [
      {
        type: Schema.Types.ObjectId,
        ref: "PhoneNumber",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Service", serviceSchema);

//or i can do UrlSchema and let location points to it
//https://www.npmjs.com/package/mongoose-type-url
