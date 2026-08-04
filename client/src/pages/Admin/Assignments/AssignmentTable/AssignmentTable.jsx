import styles from "./AssignmentTable.module.css";

const COURSE_NAMES = {
  101: "Realistic Colour Pencil Portrait",
};

export default function AssignmentTable({ assignments, onView }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student</th>

            <th>Course</th>

            <th>Lesson</th>

            <th>Status</th>

            <th>Submitted</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.userName}</td>

              <td>
                {COURSE_NAMES[assignment.courseProductId] ||
                  assignment.courseProductId}
              </td>

              <td>{assignment.assignmentTitle}</td>

              <td>
                <span
                  className={`${styles.status} ${
                    styles[assignment.status.replace("-", "")]
                  }`}
                >
                  {assignment.status}
                </span>
              </td>

              <td>{new Date(assignment.createdAt).toLocaleDateString()}</td>

              <td>
                <button onClick={() => onView(assignment._id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
