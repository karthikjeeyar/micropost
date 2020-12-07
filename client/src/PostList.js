import Axios from "axios";
import React, { useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  React.useEffect(() => {
    fetchPost();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card col-lg-3"
        style={{ marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="row d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
