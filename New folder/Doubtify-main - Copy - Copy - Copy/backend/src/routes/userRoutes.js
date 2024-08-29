import express from "express";
import {
  register_user,
  registerByGoogle,
  login_user,
  getUserDetails,
  updateUserInterests,
  getUserInterests,
  getOtherUserInfo,
  login_userGoogle,
  updateUser
} from "../controllers/userController.js";
import { upload } from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/authentication.js";
import { notifications } from "../controllers/notificationController.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePicture"), register_user);
userRouter.post("/google-login", registerByGoogle);
userRouter.post("/signin", login_user);
userRouter.post("/signinGoogle", login_userGoogle);
userRouter.get("/userInfo", authMiddleware, getUserDetails); 
userRouter.post("/otheruserInfo", getOtherUserInfo); 
userRouter.put('/:userId/interests', updateUserInterests);
userRouter.put('/:userId/bio', updateUser);
userRouter.get('/:userId/interests', getUserInterests);
userRouter.post('/notification/:userId',notifications);

export default userRouter;
