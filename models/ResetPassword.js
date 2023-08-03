const { model, Schema } = require("mongoose");

const resetPasswordSchema = new Schema(
  {
    newpassword: { type: String, required: true },
    confirmpassword: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("ResetPassword", userSchema);
