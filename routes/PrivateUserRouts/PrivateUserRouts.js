const express = require("express");
const { addShop, addShopType } = require("../../services/shopsControllers");

const router = express.Router();

router.post("/addShop", addShop).post("/addshopType", addShopType);

module.exports = router;
