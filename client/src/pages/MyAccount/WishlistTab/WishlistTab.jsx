import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import EmptyState from "../../../components/shared/EmptyState/EmptyState";

export default function WishlistTab() {
  return (
    <EmptyState
      icon={<FavoriteBorderRoundedIcon />}
      title="Your Wishlist is Empty"
      description="Save your favourite artworks, art supplies and courses so you can easily find them later."
      buttonText="Browse Shop"
      to="/shop"
    />
  );
}