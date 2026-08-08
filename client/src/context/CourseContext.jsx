import { useCallback, useEffect, useMemo, useState } from "react";

import useAuth from "../hooks/useAuth";
import { getMyOrders } from "../services/orderService";
import coursesData from "../pages/Courses/data/courses";
import { CourseContext } from "./CourseContextValue";

import { getCourseProgress as calculateCourseProgress } from "../utils/courseProgress";

import {
  getProgress,
  markLessonComplete as saveCompletedLesson,
  updateLastLesson,
} from "../services/courseProgressService";

import { getReviewSummary as fetchReviewSummary } from "../services/courseReviewService";

export default function CourseProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [purchasedProductIds, setPurchasedProductIds] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [reviewSummary, setReviewSummary] = useState({});

  const loadCourseProgress = useCallback(async (productId) => {
    try {
      const courseProgress = await getProgress(productId);

      setProgress((prev) => ({
        ...prev,
        [productId]: courseProgress,
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

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
            if (item.type === "course") {
              ownedIds.add(Number(item.productId));
            }
          });
        });

      setPurchasedProductIds([...ownedIds]);
      await Promise.all([...ownedIds].map((id) => loadCourseProgress(id)));

      // Load review summary for all courses
      const summaries = await fetchReviewSummary();

      setReviewSummary(summaries);
    } catch (error) {
      console.error(error);
      setPurchasedProductIds([]);
    } finally {
      setLoading(false);
    }
  }, [authLoading, user, loadCourseProgress]);

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

  const markLessonComplete = useCallback(async (productId, lessonId) => {
    try {
      const updated = await saveCompletedLesson(productId, lessonId);

      setProgress((prev) => ({
        ...prev,
        [productId]: updated,
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const setLastAccessedLesson = useCallback(async (productId, lessonId) => {
    try {
      const updated = await updateLastLesson(productId, lessonId);

      setProgress((prev) => ({
        ...prev,
        [productId]: updated,
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getLastAccessedLesson = useCallback(
    (productId) => progress[productId]?.lastAccessedLesson || null,
    [progress],
  );

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
      getProgress: (course) => {
        const serverProgress = progress[course.productId] || {};

        return {
          ...calculateCourseProgress(course),
          ...serverProgress,
        };
      },

      reviewSummary,
      getCourseReviewSummary: (course) =>
        reviewSummary[course.productId] || {
          averageRating: 0,
          totalReviews: 0,
        },

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
      reviewSummary,
    ],
  );

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}
