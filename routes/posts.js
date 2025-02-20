const router = require("express").Router();
const fs = require("fs");

// Load posts data from the JSON file
let posts = JSON.parse(fs.readFileSync("./data/posts.json"));

// Route to get all posts
router.get("/", (req, res) => {
  return res.json({
    status: "success",
    result: posts,
  });
});

// Route to get a specific post by ID
router.get("/:id", (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      status: "error",
      message: "Post not found.",
    });
  }

  return res.status(200).json({
    status: "success",
    result: post,
  });
});

// Route to create a new post
router.post("/create", (req, res) => {
  const data = req.body;

  // Generate a new ID for the post
  const newId = posts.at(-1).id + 1;

  // Create a new post object
  const newPost = Object.assign({ id: newId }, data);

  // Add the new post to the posts array
  posts.push(newPost);

  // Save the updated posts array to the JSON file
  fs.writeFileSync("./data/posts.json", JSON.stringify(posts, null, 2));

  return res.json({
    status: "success",
    message: "Post created successfully.",
  });
});

module.exports = router;
