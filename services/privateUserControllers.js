const crypto = require("crypto");
const User = require("../models/PrivateUsers");
const sendEmail = require("../utils/sendEmail"); // Utility to send emails

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/users/reset-password/${resetToken}`;

    // Send email
    const message = `You are receiving this email because you (or someone else) have requested a password reset. Please click the link below to reset your password: \n\n ${resetUrl}`;
    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      text: message,
    });

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const verifyToken = user.generateEmailVerificationToken();
    const verifyUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/users/verify-email/${verifyToken}`;

    // Send email
    const message = `Click the link below to verify your email: \n\n ${verifyUrl}`;
    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      text: message,
    });

    res.status(200).json({ message: "Verification email sent." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Decode the token to find the user's email or ID (implement token decoding logic if necessary)
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email successfully verified." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
