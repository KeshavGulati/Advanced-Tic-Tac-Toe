import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

// Each user is the following object:
// {
//   firstname,
//   lastname,
//   username,
//   password
// }

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const users = [];

app.post("/api/signup", async (req, res) => {
  const { firstname, lastname, username, email, password, confirmPassword } = req.body;

  let temp1 = users.filter((user) => user.email == email);
  let temp2 = users.filter((user) => user.username == username);
  if (temp1.length > 0) {
    res.status(409).json({ message: "User already exists! Please log in." });
    return;

  } else if (temp2.length > 0) {
    res.status(409).json({ message: "Username is taken! Please choose a different username." });
    return;

  } else if (password != confirmPassword) {
    res.status(409).json({ message: "Passwords do not match!" });
    return;

  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: hashedPassword,

  });

  res.status(201).json({ message: "User registered successfully", database: users });

});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  let temp = users.filter((user) => user.username == username);
  
  // Check if user exists
  if (temp.length == 0) {
    res.status(400).json({
      message: "User not found"
    });
    return;

  }

  const user = temp[0];

  // Authentication
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400),json({
      message: "Invalid credentials"

    });

  } else {
    return res.status(200).json({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      message: "Login successful!"

    });

  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});