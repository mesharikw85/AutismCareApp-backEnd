const { model, Schema } = require("mongoose");

const phoneNumberSchema = new Schema(
  {
    phones: [
      {
        tags: ["string"],
        number: "string",
        remark: "string",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("PhoneNumber", phoneNumberSchema);
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
