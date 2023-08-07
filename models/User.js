const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },

    language: { type: String, required: false },
    image: {
      type: String,
      default: "/",
    },
    phones: [
      {
        tags: ["string"],
        number: "string",
        remark: "string",
      },
    ],
    addresses: [
      {
        government: { type: String, required: false },
        city: { type: String, required: false },
        block: { type: String, required: false },
        street: { type: String, required: false },
        avenue: { type: String, required: false },
        house: { type: String, required: false },
        street: { type: String, required: false },
      },
    ],
    isStaff: { type: Boolean, default: false },
    // relations
    child: { type: Schema.Types.ObjectId, ref: "ProfileChild" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

// example

// phones :
// [
//     {
//         tags : [ "home" ] ,
//         number : "514994xxxx" ,
//     } ,
//    {
//       tags : [ "office" , "daytime" ] ,
//       number : "8199999xxx" ,
//       remark : "Do not leave message call cell"
//    }
//    {
//       tags : [ "cell" ] ,
//       number : "...." ,
//       remark : "If weekend and urgent try boat"
//    }
//    {
//       tags : [ "boat" ] ,
//       number : "...." ,
//       remark : "Urgent only"
//    }

// ]
