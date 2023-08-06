const { model, Schema } = require("mongoose");
const OrganizationSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    //relations
    type: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "ServiceType",
    },
    services: [
      { type: Schema.Types.ObjectId, required: false, ref: "Service" },
    ],
  },
  { timestamps: true }
);

module.exports = model("Organization", OrganizationSchema);
