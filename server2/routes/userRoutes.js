import express from "express";
import {discoverUsers, followUsers, getUserData, unfollowUsers, updateUserData} from '../controllers/userController.js'
import {protect} from '../middleware/auth.js'
import { upload } from "../config/multer.js";
const userRouter=express.Router();

userRouter.get('/data',protect,getUserData);

userRouter.post('/update',protect,upload.fields([{
  name:'profile',
  maxCount:1
},
{name:"cover",
  maxCOunt:1

}]),updateUserData);//multer is the middleware to handle file upload which can parse
userRouter.get('/discover',protect,discoverUsers);
userRouter.post('/follow',protect,followUsers);
userRouter.post('/unfollow',protect,unfollowUsers);
export default userRouter