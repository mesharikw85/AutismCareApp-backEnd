const { model, Schema } = require("mongoose");
const serviceTypeSchema = new Schema(
  {
    category: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    //relations
    services: [
      { type: Schema.Types.ObjectId, required: false, ref: "Service" },
    ],
  },
  { timestamps: true }
);

module.exports = model("ServiceType", serviceTypeSchema);
