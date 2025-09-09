const express = require("express");

const app = express();
const port = 3000;
const path = require("path");
const { v4: uuid } = require("uuid");
const methodoverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: uuid(),
    username: "john_doe",
    title: "First Post",
    content: "This is my first post!",
  },
  { id: uuid(),
    username: "jane_smith",
    title: "Hello World",
    content: "Hello everyone, this is Jane.",
  },
  { id: uuid(),
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
   let id = uuid();
    posts.push({ username, title, content,id, });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res)=>{
  let {id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p)=> id ===p.id);
  post.content = newcontent;
  res.redirect("/posts");
  
});
app.get("/posts/:id/edit",(req , res)=>{
    let {id} = req.params;
    let post = posts.find((p) => p.id === (id));
    res.render("edit.ejs",{post});
});

// In your app.js
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");  // Redirect to posts list after deletion
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
