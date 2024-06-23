import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { uploadOnCloud } from "../Utils/cloudinary.js";
import fs from 'fs';


const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(userExist._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const register_user = async (req, res) => {

  const { email, password, firstName,lastName } = req.body;
  const profileLocalPath = req.file ? req.file.path : null;

  try {
    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Email is not valid" });
    }
    
        // Check if user already exists
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    let cloudinaryResponse = null;
    console.log(profileLocalPath);

    if (profileLocalPath) {
      console.log('Uploading file to Cloudinary:', profileLocalPath);
      try {
        cloudinaryResponse = await uploadOnCloud(profileLocalPath);
        console.log('Cloudinary response:', cloudinaryResponse);
        fs.unlinkSync(profileLocalPath); // Remove file after successful upload
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ success: false, message: "Error uploading profile picture", error: error.message });
      }
    }

    // Create new user
    const newUser = new userModel({
      email,
      password: hashed_password,
      firstName: firstName,
      lastName:lastName,
      profile_picture: cloudinaryResponse ? cloudinaryResponse.url : null
    });

    // Save the user to the database
    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    // Respond with success
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const getOtherUserInfo = async(req,res)=>{
  try {
    const user = await userModel.findById(req.body.user_Id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
}

const updateUserInterests =  (async (req, res) => {
  const { userId } = req.params;
  const { interests } = req.body;

  try {
    // Update user's interests in the database
    const user = await userModel.findByIdAndUpdate(userId, { interests }, { new: true });

    // Send a success response
    res.status(200).json({ message: 'Interests updated successfully', user });
  } catch (error) {
    // Handle any errors and send an error response
    console.error('Error updating interests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}) 

const getUserInterests =  (async (req, res) => {
  const { userId } = req.params;

  try {
    // Update user's interests in the database
    const user = await userModel.findById(userId);

    // Send a success response
    res.status(200).json({ message: 'Interests updated successfully', user });
  } catch (error) {
    // Handle any errors and send an error response
    console.error('Error updating interests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



export { login_user, register_user, getUserDetails ,updateUserInterests,getUserInterests,getOtherUserInfo};