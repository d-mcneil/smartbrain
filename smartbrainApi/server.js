import express from "express";
import cors from "cors";

const app = express();

const database = {
  users: [
    {
      id: "0",
      name: "john",
      email: "john@john.john",
      password: "johnnyboy",
      score: 0,
      joined: new Date(),
    },
    {
      id: "1",
      name: "sally",
      email: "sally@sally.sally",
      password: "sallygirl",
      score: 0,
      joined: new Date(),
    },
  ],
};

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/sign-in", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("failure");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    name: name,
    // password: password,
    email: email,
    score: 0,
    joined: new Date(),
    id: database.users.length,
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.score++;
      return res.json(user.score);
    }
  });
  if (!found) {
    res.status(400).json("user not found");
  }
});

app.listen(3001, () => {
  console.log("SmartBrain is running on port 3001.");
});

// root route - GET
// sign-in route - POST = succes/fail
// register - POST = {user}
// profile/:userID - GET = {user}
// image - PUT = user
