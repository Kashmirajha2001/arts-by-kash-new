import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/Product.js";
import connectDB from "../config/db.js";

// Adjust this path if needed
import shopData from "../../client/src/pages/Shop/data/shopData.js";

dotenv.config();

await connectDB();

try {
  await Product.deleteMany();

  await Product.insertMany(shopData);

  console.log("✅ Products seeded successfully!");

  process.exit();
} catch (error) {
  console.error(error);

  process.exit(1);
}
