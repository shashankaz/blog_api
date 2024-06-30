import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  newPost,
  getAllPosts,
  getMyPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/post.js";

const router = express.Router();

router.post("/", isAuthenticated, newPost);
router.get("/", getAllPosts);
router.get("/me", isAuthenticated, getMyPosts);
router.get("/:id", getPost);
router.put("/:id", isAuthenticated, updatePost);
router.delete("/:id", isAuthenticated, deletePost);
router.put("/:id/like", isAuthenticated, likePost);
router.put("/:id/dislike", isAuthenticated, dislikePost);
router.post("/:id/comment", isAuthenticated, addComment);
router.put("/:postId/comment/:commentId", isAuthenticated, updateComment);
router.delete("/:postId/comment/:commentId", isAuthenticated, deleteComment);

export default router;
