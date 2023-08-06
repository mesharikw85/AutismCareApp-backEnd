const { model, Schema } = require("mongoose");
const serviceTypeSchema = new Schema(
  {
    category: { type: String, required: true, unique: true },
    image: { type: String, required: true, default: "/" },
    description: { type: String, required: true },
    //relations
    services: [{ type: Schema.Types.ObjectId, required: true, ref: "Service" }],
  },
  { timestamps: true }
);

module.exports = model("ServiceType", serviceTypeSchema);
