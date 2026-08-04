import { useEffect, useMemo, useState } from "react";

import {
  getAssignments,
  getAssignment,
} from "../../../services/adminAssignmentService";

import Loader from "../../../components/ui/Loader/Loader";

import AssignmentTable from "./AssignmentTable/AssignmentTable";
import AssignmentModal from "./AssignmentModal/AssignmentModal";

import styles from "./Assignments.module.css";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);

  const loadAssignments = async () => {
    try {
      setLoading(true);

      const data = await getAssignments();

      setAssignments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    if (statusFilter === "all") return assignments;

    return assignments.filter(
      (assignment) => assignment.status === statusFilter,
    );
  }, [assignments, statusFilter]);

  const handleOpen = async (id) => {
    try {
      const assignment = await getAssignment(id);

      setSelectedAssignment(assignment);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setSelectedAssignment(null);
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Assignments</h1>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>

          <option value="submitted">Submitted</option>

          <option value="under-review">Under Review</option>

          <option value="approved">Approved</option>

          <option value="needs-revision">Needs Revision</option>
        </select>
      </div>

      <AssignmentTable assignments={filteredAssignments} onView={handleOpen} />

      {selectedAssignment && (
        <AssignmentModal
          assignment={selectedAssignment}
          onClose={handleClose}
          reloadAssignments={loadAssignments}
        />
      )}
    </div>
  );
}
