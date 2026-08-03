import { useEffect, useState } from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Loader from "../../../../components/ui/Loader/Loader";

import ProductModal from "../ProductModal/ProductModal";

import { getProducts, deleteProduct } from "../../../../services/adminService";

import { showError, showSuccess } from "../../../../utils/toast";

import styles from "./AdminProducts.module.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);

      showError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);

    setOpenModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      showSuccess("Product deleted.");

      loadProducts();
    } catch (error) {
      console.log(error);

      showError("Unable to delete product.");
    }
  };

  const handleClose = () => {
    setOpenModal(false);

    setEditingProduct(null);
  };

  if (loading) return <Loader />;

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(query) ||
      product.type.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  });

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Products</h1>

          <p>{products.length} Products</p>
        </div>

        {/* <button className={styles.addBtn} onClick={handleAdd}>
          <AddRoundedIcon />
          Add Product
        </button> */}

        <div className={styles.right}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className={styles.addBtn} onClick={handleAdd}>
            <AddRoundedIcon />
            Add Product
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>

              <th>Title</th>

              <th>Type</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={
                      product.images?.[0]?.url ||
                      "https://placehold.co/80x80?text=No+Image"
                    }
                    alt={product.title}
                    className={styles.image}
                  />
                </td>

                <td>{product.title}</td>

                <td>{product.type}</td>

                <td>₹{product.price.toLocaleString()}</td>

                <td>{product.stock}</td>

                <td>
                  <span
                    className={`${styles.badge} ${
                      product.status === "published"
                        ? styles.published
                        : styles.draft
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(product)}
                    >
                      <EditRoundedIcon />
                    </button>

                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(product._id)}
                    >
                      <DeleteRoundedIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductModal
        open={openModal}
        onClose={handleClose}
        product={editingProduct}
        reloadProducts={loadProducts}
      />
    </section>
  );
}
