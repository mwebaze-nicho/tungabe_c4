const express = require("express"); // Import the express module
const app = express(); // Create an instance of express
const userRouter = require("./routes/users"); // Import the user routes
const postRouter = require("./routes/posts"); // Import the post routes

const port = 3000; // Define the port number

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/users", userRouter); // Use the user routes for paths starting with /users
app.use("/posts", postRouter); // Use the post routes for paths starting with /posts

app.listen(port, () => {
  console.log(`Server is running on ${port}`); // Start the server and listen on the defined port
});
