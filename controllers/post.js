import { Post } from "../models/post.js";
import { handleErrors } from "../utils/helpers.js";

// Create a new post
export const newPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", "name");

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Get posts created by the logged-in user
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).populate(
      "author",
      "name"
    );

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.user", "name");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post Updated Successfully",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You already liked this post",
      });
    }

    post.likes.push(req.user._id);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post Liked",
      likes: post.likes.length,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Dislike a post
export const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const index = post.likes.indexOf(req.user._id);

    if (index === -1) {
      return res.status(400).json({
        success: false,
        message: "You haven't liked this post yet",
      });
    }

    post.likes.splice(index, 1);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post Disliked",
      likes: post.likes.length,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const comment = {
      user: req.user._id,
      content,
    };

    post.comments.push(comment);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment Added",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this comment",
      });
    }

    comment.content = content || comment.content;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment Updated",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    comment.remove();
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment Deleted",
      post,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
