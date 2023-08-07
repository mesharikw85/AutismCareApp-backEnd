const { model, Schema } = require("mongoose");

const ListCatagorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    listcatagory: { type: Schema.Types.ObjectId, ref: "listcatagory" },
    numbers: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ListCatagory", ListCatagorySchema);
