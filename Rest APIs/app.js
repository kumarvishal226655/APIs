const express = require("express");

const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    username: "john_doe",
    title: "First Post",
    content: "This is my first post!",
  },
  {
    username: "jane_smith",
    title: "Hello World",
    content: "Hello everyone, this is Jane.",
  },
  {
    username: "alice_wonder",
    title: "Adventures",
    content: "I love adventures and exploring new places.",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
