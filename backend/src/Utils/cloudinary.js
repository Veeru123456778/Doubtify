// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloud = async (absoluteFilePath) => {
//   console.log(absoluteFilePath);

//   try {
//     if (!absoluteFilePath) {
//       return null;
//     }
//     const response = await cloudinary.uploader.upload(absoluteFilePath, {
//       resource_type: "auto",
//     });

//     console.log("File has been uploaded successfully", response.url);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(absoluteFilePath);
//     return null;
//   }
// };

// export { uploadOnCloud };


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
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


export default uploadOnCloud ;