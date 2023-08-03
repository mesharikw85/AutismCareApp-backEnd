const { model, Schema } = require("mongoose");

const forgotPasswordSchema = new Schema(
  {
    email: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("ForgotPassword", userSchema);
