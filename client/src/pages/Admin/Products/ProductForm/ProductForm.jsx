import { useEffect, useState } from "react";

import {
  createProduct,
  updateProduct,
} from "../../../../services/adminService";

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
  status: "published",
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_SIZE_MB = MAX_IMAGE_SIZE / (1024 * 1024);

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.response?.data?.error ||
  error.message ||
  "Something went wrong.";

export default function ProductForm({ product, onClose, reloadProducts }) {
  const [formData, setFormData] = useState(initialState);

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [saving, setSaving] = useState(false);

  const [deletedImages, setDeletedImages] = useState([]);

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    const image = existingImages[index];

    setDeletedImages((prev) => [...prev, image.public_id]);

    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageSelect = (e) => {
    const selected = Array.from(e.target.files || []);

    const oversizedImages = selected.filter(
      (image) => image.size > MAX_IMAGE_SIZE,
    );

    if (oversizedImages.length) {
      showError(
        `Each image must be ${MAX_IMAGE_SIZE_MB}MB or smaller. Please compress: ${oversizedImages
          .map((image) => image.name)
          .join(", ")}`,
      );
    }

    const validImages = selected.filter((image) => image.size <= MAX_IMAGE_SIZE);

    if (validImages.length) {
      setImages((prev) => [...prev, ...validImages]);
    }

    e.target.value = "";
  };

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        ...product,

        description: product.description?.join("\n") || "",
      });

      setExistingImages(product.images || []);

      setImages([]);
    } else {
      setFormData(initialState);

      setExistingImages([]);

      setImages([]);
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

      if (!product && images.length === 0) {
        showError("Please add at least one product image.");
        return;
      }

      const payload = new FormData();

      payload.append("id", Number(formData.id));
      payload.append("title", formData.title);
      payload.append("slug", formData.slug);
      payload.append("type", formData.type);
      payload.append("category", formData.category);
      payload.append("price", Number(formData.price));
      payload.append("stock", Number(formData.stock));
      payload.append("featured", formData.featured);
      payload.append("badge", formData.badge);
      payload.append("medium", formData.medium);
      payload.append("size", formData.size);
      payload.append("frame", formData.frame);
      payload.append("availability", formData.availability);
      payload.append("status", formData.status);
      payload.append(
        "description",
        JSON.stringify(formData.description.split("\n").filter(Boolean)),
      );

      if (images) {
        // payload.append("image", image);
        images.forEach((image) => {
          payload.append("images", image);
        });
      }

      payload.append("deletedImages", JSON.stringify(deletedImages));
      if (product) {
        await updateProduct(product._id, payload);

        showSuccess("Product updated successfully.");
      } else {
        await createProduct(payload);

        showSuccess("Product created successfully.");
      }

      reloadProducts();

      setExistingImages([]);
      setImages([]);
      onClose();
    } catch (error) {
      console.log(error);

      showError(getErrorMessage(error));
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
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
          />

          <div className={styles.previewGrid}>
            {existingImages.map((img, index) => (
              <div key={`existing-${index}`} className={styles.previewCard}>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeExistingImage(index)}
                >
                  ✕
                </button>

                <img src={img.url} alt="" className={styles.preview} />
              </div>
            ))}

            {images.map((img, index) => (
              <div key={`new-${index}`} className={styles.previewCard}>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeNewImage(index)}
                >
                  ✕
                </button>

                <img
                  src={URL.createObjectURL(img)}
                  alt=""
                  className={styles.preview}
                />
              </div>
            ))}
          </div>
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
