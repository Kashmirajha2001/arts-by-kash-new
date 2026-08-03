import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "published",
    }).sort({
      featured: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id),
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    // let images = [];

    const images = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(
          file.buffer,
          "artsbykash/products",
        );

        images.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        });
      }
    }

    const product = await Product.create({
      ...req.body,
      id: Number(req.body.id),
      price: Number(req.body.price),
      stock: Number(req.body.stock),

      featured: req.body.featured === "true" || req.body.featured === true,

      description:
        typeof req.body.description === "string"
          ? JSON.parse(req.body.description)
          : req.body.description,

      images,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Existing images
    let images = [...product.images];

    // Images removed by admin
    const deletedImages = req.body.deletedImages
      ? JSON.parse(req.body.deletedImages)
      : [];

    // Delete removed images from Cloudinary
    if (deletedImages.length) {
      for (const public_id of deletedImages) {
        await cloudinary.uploader.destroy(public_id);

        images = images.filter((img) => img.public_id !== public_id);
      }
    }

    // Upload newly selected images
    if (req.files?.length) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(
          file.buffer,
          "artsbykash/products",
        );

        images.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        });
      }
    }

    product.title = req.body.title;
    product.slug = req.body.slug;
    product.type = req.body.type;
    product.category = req.body.category;
    product.price = Number(req.body.price);
    product.stock = Number(req.body.stock);
    product.featured = req.body.featured === "true";
    product.badge = req.body.badge;
    product.medium = req.body.medium;
    product.size = req.body.size;
    product.frame = req.body.frame;
    product.availability = req.body.availability;
    product.status = req.body.status;

    product.description =
      typeof req.body.description === "string"
        ? JSON.parse(req.body.description)
        : [];

    product.images = images;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
