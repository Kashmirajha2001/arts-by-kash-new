import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import ProductForm from "../ProductForm/ProductForm";

import styles from "./ProductModal.module.css";

export default function ProductModal({
  open,
  onClose,
  product,
  reloadProducts,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className={styles.title}>
        {product ? "Edit Product" : "Add Product"}

        <IconButton onClick={onClose} className={styles.close}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <ProductForm
        product={product}
        onClose={onClose}
        reloadProducts={reloadProducts}
      />
    </Dialog>
  );
}
