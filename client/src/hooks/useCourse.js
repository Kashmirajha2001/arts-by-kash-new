import { useContext } from "react";

import { CourseContext } from "../context/CourseContextValue";

export default function useCourse() {
  return useContext(CourseContext);
}
