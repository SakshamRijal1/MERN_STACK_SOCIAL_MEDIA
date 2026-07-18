import express from "express"
import { protect } from "../middleware/auth.js";
import { upload } from "../config/multer.js";
import { addPost, deletePost, findHashtag, getFeedPost, getLikePost, getPost, likePost, updatePost } from "../controllers/postController.js";
const postRouter=express.Router();
postRouter.post('/add',protect,upload.array('images',4),addPost)

postRouter.get('/feed',protect,getFeedPost)
postRouter.post('/update',protect,upload.array("images", 4),updatePost)
postRouter.post('/like',protect,likePost)
postRouter.post('/delete',protect,deletePost)
postRouter.post('/hashtag',protect,findHashtag)
postRouter.post('/likecount',protect,getLikePost)
postRouter.post('/onepost',protect,getPost)
export default postRouter