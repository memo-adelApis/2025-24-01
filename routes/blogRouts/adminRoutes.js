const express = require("express");

const router = express.Router();
const postService = require("../../services/blogServices/postService");
const commentService = require("../../services/blogServices/commentService");

// Admin: Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete a post by ID
router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await postService.deletePost(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete a comment by ID
router.delete("/comments/:id", async (req, res) => {
  try {
    const deletedComment = await commentService.deleteComment(req.params.id);
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
