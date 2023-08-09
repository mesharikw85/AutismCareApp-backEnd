const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    email: { type: String, required: false },

    language: { type: String, required: false },
    image: { type: String, required: false },
    phones: String,
    addresses: String,

    // relations
    child: { type: Schema.Types.ObjectId, ref: "ProfileChild" },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);

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
