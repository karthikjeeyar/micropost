import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    const content =
      comment.status === "approved"
        ? comment.content
        : comment.status === "pending"
        ? "This comment is awaiting moderation"
        : "This comment is rejected";
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
