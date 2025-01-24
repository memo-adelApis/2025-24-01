const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ShopTypeSchema = new mongoose.Schema({
  typeName: {
    type:String,
    required: true,
  },
}); 


module.exports = mongoose.model("ShopType", ShopTypeSchema);
