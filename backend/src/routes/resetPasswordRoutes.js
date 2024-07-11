// routes/resetPassword.js
import express from 'express';
import crypto from 'crypto';
import userModel from '../models/userModel.js'; // Adjust the path as needed
import sendResetPasswordEmail from '../Utils/sendResetPasswordEmail.js';

const resetPasswordRouter = express.Router();

resetPasswordRouter.post('/request-reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    sendResetPasswordEmail(user.email, token);

    res.json({ message: 'Reset password link has been sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error on the server' });
  }
});

// routes/resetPassword.js (continued)
resetPasswordRouter.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
      }
  
      user.password = newPassword; // Ensure you hash the password before saving
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error on the server' });
    }
  });
  
  export default resetPasswordRouter;
  