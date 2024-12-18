import React from "react";
import Card from "./Card";
import { useEffect } from "react";

const CommentsList = ({
  comments,
  setShowSuccess,
  setShowDeleteError,
  setEditError,
}) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0, marginTop: 10 }}>
      {comments.map((comment) => (
        <li
          key={comment._id}
          style={{
            marginBottom: "16px",
            padding: "50px",
            textAlign: "center",
          }}
          className="flex justify-center"
        >
          <div>
            <Card
              description={comment.comment}
              author={comment.author}
              authorId={comment.postId}
              title={comment.postId?.title}
              date={new Date(comment.createdAt).toLocaleString()}
              commentId={comment._id}
              replies={comment.replies}
              likes={comment.likes}
              likedBy={comment.likedBy}
              location={comment.postId?.location}
              bio={comment.postId?.bio}
              setEditError={setEditError}
              setShowSuccess={setShowSuccess}
              setShowDeleteError={setShowDeleteError}
              comments={comments}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
