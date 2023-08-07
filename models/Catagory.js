const { model, Schema } = require("mongoose");

const CatagorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    listcatagory: { type: Schema.Types.ObjectId, ref: "ListCatagory" },
  },
  { timestamps: true }
);

module.exports = model("Catagory", CatagorySchema);
