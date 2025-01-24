// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const Shop = require("../models/Shop");
const ShopType = require("../models/ShopType");


const addShop = async (req, res, next) => {
    const newShop = await Shop.create(req.body)
    res.status(201).json({ data: newShop });
 
}

const addShopType = async (req, res) => {
    try {
      const shoptype = new ShopType(req.body);
      await shoptype.save();
      res.status(201).json(shoptype);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
const getShop = async (req, res) => {
try {
  const shops = await Shop.find().populate("shopTypeId");
  res.status(200).json({result : shops.length , data : shops })
} catch (error) {
      res.status(400).json({ error: error.message });
  
}
}

module.exports = {
  addShop,
  addShopType,
  getShop,
};