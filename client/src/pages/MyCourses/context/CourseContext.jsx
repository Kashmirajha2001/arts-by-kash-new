import { useCallback, useEffect, useMemo, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import { getMyOrders } from "../../../services/orderService";
import coursesData from "../../Courses/data/courses";
import { CourseContext } from "./CourseContextValue";
import {
  getCourseProgress,
  readProgress,
  writeProgress,
} from "../utils/courseProgress";

export default function CourseProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [purchasedProductIds, setPurchasedProductIds] = useState([]);
  const [progress, setProgress] = useState(() => readProgress());
  const [loading, setLoading] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null);

  const reloadCourses = useCallback(async () => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setPurchasedProductIds([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const orders = await getMyOrders();
      const ownedIds = new Set();

      orders
        .filter((order) => order.paymentStatus === "paid")
        .forEach((order) => {
          order.items?.forEach((item) => {
            ownedIds.add(Number(item.productId));
          });
        });

      setPurchasedProductIds([...ownedIds]);
    } catch (error) {
      console.error(error);
      setPurchasedProductIds([]);
    } finally {
      setLoading(false);
    }
  }, [authLoading, user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reloadCourses();
  }, [reloadCourses]);

  const isCourseOwned = useCallback(
    (productId) => purchasedProductIds.includes(Number(productId)),
    [purchasedProductIds],
  );

  const getCourseBySlug = useCallback(
    (slug) => coursesData.find((course) => course.slug === slug),
    [],
  );

  const ownedCourses = useMemo(
    () => coursesData.filter((course) => isCourseOwned(course.productId)),
    [isCourseOwned],
  );

  const markLessonComplete = useCallback((productId, lessonId) => {
    setProgress((prev) => {
      const courseKey = String(productId);
      const courseProgress = prev[courseKey] || {
        completedLessons: [],
        lastAccessedLesson: null,
      };

      const completedLessons = courseProgress.completedLessons.includes(
        lessonId,
      )
        ? courseProgress.completedLessons
        : [...courseProgress.completedLessons, lessonId];

      const next = {
        ...prev,
        [courseKey]: {
          ...courseProgress,
          completedLessons,
          lastAccessedLesson: lessonId,
          lastAccessedAt: new Date().toISOString(),
        },
      };

      writeProgress(next);
      return next;
    });
  }, []);

  const setLastAccessedLesson = useCallback((productId, lessonId) => {
    setProgress((prev) => {
      const courseKey = String(productId);
      const next = {
        ...prev,
        [courseKey]: {
          ...(prev[courseKey] || { completedLessons: [] }),
          lastAccessedLesson: lessonId,
          lastAccessedAt: new Date().toISOString(),
        },
      };

      writeProgress(next);
      return next;
    });
  }, []);

  const getLastAccessedLesson = (productId) => {
    return progress[productId]?.lastAccessedLesson || null;
  };

  const value = useMemo(
    () => ({
      courses: coursesData,
      ownedCourses,
      loading,
      reloadCourses,
      isCourseOwned,
      getCourseBySlug,
      currentCourse,
      setCurrentCourse,
      progress,
      getProgress: (course) => getCourseProgress(course, progress),
      markLessonComplete,
      setLastAccessedLesson,
      getLastAccessedLesson,
    }),
    [
      ownedCourses,
      loading,
      reloadCourses,
      isCourseOwned,
      getCourseBySlug,
      currentCourse,
      progress,
      markLessonComplete,
      setLastAccessedLesson,
      getLastAccessedLesson,
    ],
  );

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}
