const { model, Schema } = require("mongoose");
const serviceSchema = new Schema(
  {
    servicetitle: { type: String, required: true, unique: true },
    image: { type: String, required: true, default: "/" },
    description: { type: String, required: true },
    // location: {
    //   type: "Point",
    //   coordinates: [longitude, latitude],
    //   required: false,
    // },
    email: { type: String, required: true },
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
    //relations
    servicetype: { type: Schema.Types.ObjectId, ref: "ServiceType" },
  },
  { timestamps: true }
);

module.exports = model("Service", serviceSchema);

//or i can do UrlSchema and let location points to it
