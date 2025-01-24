const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const privateUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
  privteUsersrole: {
    type: String,
    enum: ["manager", "custemor"],
    default: "custemor",
  },

  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shops",
    required: true,
  },
  isVerified: { type: Boolean, default: false }, // For email verification
  resetPasswordToken: { type: String }, // Token for resetting password
  resetPasswordExpires: { type: Date }, //
});

// Hash password before saving
privateUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

privateUserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// Generate reset password token
privateUserSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    return resetToken;
};

// Generate email verification token
privateUserSchema.methods.generateEmailVerificationToken = function () {
  const verifyToken = crypto.randomBytes(20).toString("hex");
  return verifyToken; // Token to be sent via email
};

const PrivateUser =
  mongoose.models.PrivateUser ||
  mongoose.model("PrivateUser", privateUserSchema);

module.exports = PrivateUser;