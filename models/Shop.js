const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  shopTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopType",
    required: true,
  },
  primUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateStart: { type: Date, required: true },

  shopName: { type: String, required: true },
  shopStatus: {
    type: String,
    enum: ["Acteive", "NotActive"],
    default: "NotActive",
  },
}); ;


module.exports = mongoose.model("Shops", ShopSchema);
