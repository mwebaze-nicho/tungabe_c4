const router = require("express").Router();

//sample user data
const users = [
  {
    id: 1,
    name: "John",
    age: 25,
  },
  {
    id: 2,
    name: "Jane",
    age: 30,
  },
];

router.post("/:id", (req, res) => {
  const data = req.body;

  const id = req.params.id;

  //return user matching the id
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found.",
    });
  }

  //   console.log(data);
  return res.json({
    status: "success",
    message: "User created successfully.",
    user,
  });
});

function middlware(req, res, next) {
  //getting id from the url
  const id = parseInt(req.params.id);

  if (id === 1 || id === 2) {
    req.userId = id;
    next();
  }

  return res.status(404).json({
    status: "error",
    message: "User not found throw middleware.",
  });
}

router.get("/:id", middlware, (req, res) => {
  //sample user data
  const users = [
    {
      id: 1,
      name: "John",
      age: 25,
    },
    {
      id: 2,
      name: "Jane",
      age: 30,
    },
  ];

  //return user matching the id
  const user = users.find((user) => user.id === req.userId);

  //   console.log(data);
  return res.json({
    status: "success",
    message: "User created successfully.",
    user,
  });
});

router
  .route("/")
  .get(
    (req, res, next) => {
      console.log(req.method);
      console.log("Middleware ran.");

      next();
    },
    (req, res) => {
      // console.log(req.method);

      return res.json({
        status: "success",
        message: "Users get request.",
      });
    }
  )
  .post((req, res) => {
    // console.log(req.method);

    return res.json({
      status: "success",
      message: "User created successfully.",
    });
  });

module.exports = router;
