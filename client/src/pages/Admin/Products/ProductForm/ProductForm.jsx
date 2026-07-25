import { useEffect, useState } from "react";

import { createProduct, updateProduct } from "../../../../services/adminService";

import { showSuccess, showError } from "../../../../utils/toast";

import styles from "./ProductForm.module.css";

const initialState = {
  id: "",

  title: "",

  slug: "",

  type: "artwork",

  category: "",

  price: "",

  stock: "",

  featured: false,

  badge: "",

  medium: "",

  size: "",

  frame: "",

  availability: "",

  description: "",

  images: "",

  status: "published",
};

export default function ProductForm({ product, onClose, reloadProducts }) {
  const [formData, setFormData] = useState(initialState);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,

        description: product.description?.join("\n") || "",

        images: product.images?.[0] || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [product]);

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setFormData((prev) => ({
      ...prev,

      title,

      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,

        id: Number(formData.id),

        price: Number(formData.price),

        stock: Number(formData.stock),

        description: formData.description.split("\n").filter(Boolean),

        images: formData.images ? [formData.images] : [],
      };

      if (product) {
        await updateProduct(product._id, payload);

        showSuccess("Product updated successfully.");
      } else {
        await createProduct(payload);

        showSuccess("Product created successfully.");
      }

      reloadProducts();

      onClose();
    } catch (error) {
      console.log(error);

      showError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        {/* Product ID */}
        <div className={styles.field}>
          <label>Product ID</label>

          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            disabled={!!product}
          />
        </div>

        {/* Title */}

        <div className={styles.field}>
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
          />
        </div>

        {/* Slug */}

        <div className={styles.field}>
          <label>Slug</label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>

        {/* Type */}

        <div className={styles.field}>
          <label>Type</label>

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="artwork">Artwork</option>

            <option value="print">Print</option>

            <option value="course">Course</option>
          </select>
        </div>

        {/* Category */}

        <div className={styles.field}>
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        {/* Price */}

        <div className={styles.field}>
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}

        <div className={styles.field}>
          <label>Stock</label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Badge */}

        <div className={styles.field}>
          <label>Badge</label>

          <input
            type="text"
            name="badge"
            value={formData.badge}
            onChange={handleChange}
          />
        </div>

        {/* Medium */}

        <div className={styles.field}>
          <label>Medium</label>

          <input
            type="text"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
          />
        </div>

        {/* Size */}

        <div className={styles.field}>
          <label>Size</label>

          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>

        {/* Frame */}

        <div className={styles.field}>
          <label>Frame</label>

          <input
            type="text"
            name="frame"
            value={formData.frame}
            onChange={handleChange}
          />
        </div>

        {/* Availability */}

        <div className={styles.field}>
          <label>Availability</label>

          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          />
        </div>

        {/* Status */}

        <div className={styles.field}>
          <label>Status</label>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="published">Published</option>

            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Image */}

        <div className={styles.field}>
          <label>Image URL</label>

          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Featured */}

      <div className={styles.checkbox}>
        <label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured Product
        </label>
      </div>

      {/* Description */}

      <div className={styles.field}>
        <label>Description</label>

        <textarea
          rows={6}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write each point on a new line..."
        />
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.cancel} onClick={onClose}>
          Cancel
        </button>

        <button type="submit" className={styles.save} disabled={saving}>
          {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
