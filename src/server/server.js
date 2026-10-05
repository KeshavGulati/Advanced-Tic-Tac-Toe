import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Database from 'better-sqlite3';

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

// Setting up the database
const db = new Database('../database/tic-tac-toe.db')


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

  /*
  users.push({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: hashedPassword,

  });
  */

  try {
    const stmt = db.prepare(`
      INSERT INTO users (firstname, lastname, username, email, password)
      VALUES (?, ?, ?, ?, ?);
    `);

    const result = stmt.run(
      firstname,
      lastname,
      username,
      email,
      hashedPassword
    );

    res.status(201).json({ message: "User registered successfully", database: users });

  } catch (err) {
    res.status(500).json({error: "Database error"});

  }

});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  let temp = users.filter((user) => user.username == username);
  const row = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);

  // Check if user exists
  if (!row) {
    res.status(400).json({
      message: "User not found"
    });
    return;

  }
  
  // Authentication
  const isMatch = await bcrypt.compare(password, row.password);
  if (!isMatch) {
    return res.status(400),json({
      message: "Invalid credentials"

    });

  } else {
    return res.status(200).json({
      firstname: row.firstname,
      lastname: row.lastname,
      username: row.username,
      email: row.email,
      message: "Login successful!"

    });

  }

});

app.post("/auth/request-otp", async (req, res) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = crypto
                    .createHash("sha256")
                    .update(otp)
                    .digest("hex");

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});
