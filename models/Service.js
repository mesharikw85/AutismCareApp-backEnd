const { model, Schema } = require("mongoose");
const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: "/" },
    description: { type: String },
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
      required: false,
    },
    like: { type: Schema.Types.ObjectId, ref: "Like" },
  },
  { timestamps: true }
);

//or i can do UrlSchema and let location points to it
//https://www.npmjs.com/package/mongoose-type-url
