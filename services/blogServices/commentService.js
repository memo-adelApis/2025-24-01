const Comment = require("../../models/blogModels/Comment");

// Get all comments for a post
const getCommentsByPostId = async (postId) => {
  await Comment.find({ postId }).sort({ createdAt: 1 });
};

// Create a comment
const createComment = async (commentData) => {
  const comment = new Comment(commentData);
  return await comment.save();
};

// Delete a comment
const deleteComment = async (id) => await Comment.findByIdAndDelete(id);

module.exports = {
  getCommentsByPostId,
  createComment,
  deleteComment,
};
