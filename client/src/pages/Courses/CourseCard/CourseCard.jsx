import { useState } from "react";
import styles from "./CourseCard.module.css";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

export default function CourseCard({ course }) {
  const [selectedImage, setSelectedImage] = useState(course.images[0]);

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

        {/* Buttons */}

        {/* <div className={styles.actionButtons}>
          <PrimaryButton>
            <FaShoppingCart />
            Add to Cart
          </PrimaryButton>

          <button className={styles.wishlist}>
            <FaHeart />
          </button>
        </div> */}

        <PrimaryButton className={styles.buyButton}>Enroll Now</PrimaryButton>

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
