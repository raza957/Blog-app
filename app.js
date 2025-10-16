import express from "express";
import bodyParser from "body-parser";
const app = express();
import path from "path";



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let posts = [];

// Routes
app.get("/", (req, res) => {
  res.render("home", { posts });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  res.render("edit", { index, post: posts[index] });
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const { title, content } = req.body;
  posts[index] = { title, content };
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server started on port 3000"));