import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import EmptyState from "../../../components/shared/EmptyState/EmptyState";

export default function CoursesTab() {
  return (
    <EmptyState
      icon={<SchoolOutlinedIcon />}
      title="No Courses Yet"
      description="Purchase one of our art courses and continue learning at your own pace."
      buttonText="Explore Courses"
      to="/courses"
    />
  );
}