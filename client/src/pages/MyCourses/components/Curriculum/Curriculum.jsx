import PublicCurriculum from "../../../Courses/Curriculum/Curriculum";

export default function Curriculum({ course, completedLessons }) {
  return (
    <PublicCurriculum
      course={course}
      hasAccess
      completedLessons={completedLessons}
    />
  );
}
