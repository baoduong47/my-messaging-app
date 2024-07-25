const express = require("express");
const commentRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getComments,
  getCommentById,
  postComment,
  editComment,
  deleteComment,
  replyComment,
} = require("../controllers/commentController");

commentRouter.route("/").get(getComments).post(authMiddleware, postComment);

commentRouter
  .route("/:commentId")
  .get(getCommentById)
  .put(editComment)
  .delete(authMiddleware, deleteComment);

commentRouter.route("/:commentId/replies").post(authMiddleware, replyComment);
module.exports = commentRouter;
