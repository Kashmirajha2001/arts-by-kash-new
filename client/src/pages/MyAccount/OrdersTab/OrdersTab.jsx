import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import EmptyState from "../../../components/shared/EmptyState/EmptyState";

export default function OrdersTab() {
  return (
    <EmptyState
      icon={<Inventory2OutlinedIcon />}
      title="No Orders Yet"
      description="Once you purchase artwork, supplies or courses, they'll appear here."
      buttonText="Start Shopping"
      to="/shop"
    />
  );
}