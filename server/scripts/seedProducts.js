import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/Product.js";
import connectDB from "../config/db.js";

// Adjust this path if needed
// import shopData from "../../client/src/pages/Shop/data/shopData.js";
import products from "../data/products.js";

dotenv.config();

await connectDB();

try {
  await Product.deleteMany();

  // const products = shopData.map((product) => ({
  //   ...product,

  //   slug: product.title.toLowerCase().replace(/\s+/g, "-"),

  //   images: [],

  //   category: "",

  //   featured: false,

  //   badge: "",

  //   medium: "",

  //   size: "",

  //   frame: "",

  //   availability: "",

  //   description: [],

  //   status: "published",
  // }));

  await Product.insertMany(products);

  console.log("✅ Products seeded successfully!");

  process.exit();
} catch (error) {
  console.error(error);

  process.exit(1);
}
