import { useEffect, useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import {
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../../../services/addressService";

import { showSuccess, showError } from "../../../utils/toast";

import AddressModal from "./AddressModal";
import DeleteConfirm from "./DeleteConfirm";

import styles from "./AddressesTab.module.css";

export default function AddressesTab() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchAddresses = async () => {
    try {
      const res = await getAddresses();
      setAddresses(res.data.addresses);
    } catch {
      showError("Failed to load addresses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingAddress(null);
  };

  const handleSaved = (updated) => {
    setAddresses(updated);
    handleModalClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await deleteAddress(deletingId);
      setAddresses(res.data.addresses);
      showSuccess("Address deleted.");
    } catch {
      showError("Failed to delete address.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const res = await setDefaultAddress(id);
      setAddresses(res.data.addresses);
      showSuccess("Default address updated.");
    } catch {
      showError("Failed to update default address.");
    }
  };

  if (loading) return <p className={styles.loading}>Loading addresses...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <h2>Saved Addresses</h2>
        <button className={styles.addBtn} onClick={handleAdd}>
          <AddRoundedIcon fontSize="small" />
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className={styles.empty}>
          <LocationOnOutlinedIcon className={styles.emptyIcon} />
          <h3>No addresses saved yet</h3>
          <p>Add a shipping address to speed up checkout.</p>
          <button className={styles.addBtn} onClick={handleAdd}>
            <AddRoundedIcon fontSize="small" />
            Add New Address
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`${styles.card} ${addr.isDefault ? styles.defaultCard : ""}`}
            >
              {/* top row */}
              <div className={styles.cardHeader}>
                <div className={styles.labelRow}>
                  <span className={styles.label}>
                    {addr.label || "Address"}
                  </span>
                  {addr.isDefault && (
                    <span className={styles.badge}>
                      <CheckCircleRoundedIcon style={{ fontSize: 13 }} />
                      Default
                    </span>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <button onClick={() => handleEdit(addr)}>
                    <EditOutlinedIcon fontSize="small" />
                    Edit
                  </button>
                  <button
                    className={styles.deleteAction}
                    onClick={() => setDeletingId(addr._id)}
                  >
                    <DeleteOutlineRoundedIcon fontSize="small" />
                    Delete
                  </button>
                </div>
              </div>

              {/* address lines */}
              <div className={styles.addressLines}>
                <p className={styles.street}>{addr.street}</p>
                <p>
                  {addr.city}, {addr.state}
                </p>
                <p>
                  {addr.pincode}, {addr.country}
                </p>
              </div>

              {/* set default */}
              {!addr.isDefault && (
                <button
                  className={styles.setDefaultBtn}
                  onClick={() => handleSetDefault(addr._id)}
                >
                  <StarBorderRoundedIcon fontSize="small" />
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      {modalOpen && (
        <AddressModal
          address={editingAddress}
          onClose={handleModalClose}
          onSaved={handleSaved}
        />
      )}

      {/* Delete confirmation */}
      {deletingId && (
        <DeleteConfirm
          onCancel={() => setDeletingId(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
