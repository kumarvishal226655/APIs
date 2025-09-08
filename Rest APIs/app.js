const express = require("express");

const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: "1a",
    username: "john_doe",
    title: "First Post",
    content: "This is my first post!",
  },
  { id: "2b",
    username: "jane_smith",
    title: "Hello World",
    content: "Hello everyone, this is Jane.",
  },
  { id: "3c",
    username: "alice_wonder",
    title: "Adventures",
    content: "I love adventures and exploring new places.",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
   let { username, title, content } = req.body;
    posts.push({ username, title, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
