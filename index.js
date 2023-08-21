const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { connection } = require("./Controllers/connection");
const { route } = require("./Routes/user.route");
const { appointments } = require("./Routes/Doctor.route");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use("/", route);
app.use("/", appointments);

const PORT = process.env.PORT; // Use the PORT environment variable or default to 9090

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
  console.log(`Server is running on port ${PORT}`);
});
