require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

beforeAll(async () => {
  console.log("Connecting Test DB...");
  await connectDB();
  console.log("Test DB Connected");
});

afterAll(async () => {
  console.log("Closing Test DB...");
  await mongoose.connection.close();
});