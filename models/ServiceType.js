const { model, Schema } = require("mongoose");
const serviceTypeSchema = new Schema(
  {
    category: { type: String, required: true, unique: true },
    image: { type: String, required: true, default: "/" },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("ServiceType", serviceTypeSchema);
