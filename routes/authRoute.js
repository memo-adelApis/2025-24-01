const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  signupValidator,
  loginValidator,
} = require('../utils/validators/authValidator');

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
  getMyUsers,
  getMyShop,
} = require('../services/authService');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);
router.get("/myShops/:userId", getMyShop);


router.get("/myUsers/:shopId", getMyUsers)
//---------------------------------------------------------------------
  


module.exports = router;
