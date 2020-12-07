const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    console.log("data", data, posts);
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, status } = data;
    const post = posts[postId];

    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get("http://localhost:4005/events");
  console.log(res.data);
  for (let event of res.data) {
    console.log("Processing event:", event.type);
    handleEvents(event.type, event.data);
  }
});
