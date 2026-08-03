import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import useAuth from "../../../hooks/useAuth";
import { useStore } from "../../../context/StoreContext";
import useCourse from "../../MyCourses/hooks/useCourse";

import styles from "./CourseCard.module.css";

export default function CourseCard({ course }) {
  const [selectedImage, setSelectedImage] = useState(course.images[0]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useStore();
  const { isCourseOwned } = useCourse();

  const owned = isCourseOwned(course.productId);
  const inCart = isInCart(course.productId);

  const handleCourseAction = () => {
    if (owned) {
      navigate(`/my-courses/${course.slug}`);
      return;
    }

    if (!user) {
      navigate("/auth?mode=login", {
        state: { from: { pathname: "/courses" } },
      });
      return;
    }

    if (inCart) {
      navigate("/cart");
      return;
    }

    addToCart(course.productId);
  };

  return (
    <div className={styles.card}>
      {/* LEFT */}
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <img src={selectedImage} alt={course.title} />
        </div>

        <div className={styles.thumbnails}>
          {course.images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumb} ${
                selectedImage === image ? styles.active : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT */}

      <div className={styles.details}>
        <h1>{course.title}</h1>
        <p className={styles.shortDescription}>{course.shortDescription}</p>

        {/* Price */}

        {!owned && (
          <div className={styles.priceBox}>
            <span className={styles.price}>₹{course.price}</span>

            {course.originalPrice && (
              <span className={styles.originalPrice}>
                ₹{course.originalPrice}
              </span>
            )}

            {course.discountLabel && (
              <span className={styles.discount}>{course.discountLabel}</span>
            )}
          </div>
        )}

        {/* Buttons */}

        {/* <div className={styles.actionButtons}>
          <PrimaryButton>
            Add to Cart
          </PrimaryButton>

          <button className={styles.wishlist}>
            Save
          </button>
        </div> */}

        <PrimaryButton className={styles.buyButton} onClick={handleCourseAction}>
          {owned ? "Go To My Course" : inCart ? "Go To Cart" : "Enroll Now"}
        </PrimaryButton>

        {/* Divider */}

        <div className={styles.divider}></div>

        {/* Course Info */}

        <div className={styles.info}>
          <h3>Inside this Masterclass</h3>
          <div className={styles.rating}>
            <FaStar />
            <span>
              {course.rating} ({course.reviews} Reviews)
            </span>
          </div>

          <p>
            <strong>Students:</strong> {course.students}
          </p>

          {course.highlights.map((item, index) => (
            <div key={index} className={styles.highlight}>
              ✓ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
