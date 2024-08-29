import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloud = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath,{
      quality:"auto",
      fetch_format:"auto",
      crop:"limit"
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


export default uploadOnCloud ;