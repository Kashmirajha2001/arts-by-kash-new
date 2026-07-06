import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import "swiper/css";
import "swiper/css/navigation";

import shopData from "../../data/shopData";
import ProductCard from "../../ProductCard/ProductCard";

import styles from "./RelatedProducts.module.css";

export default function RelatedProducts({ currentId }) {
  const related = shopData.filter((item) => item.id !== currentId).slice(0, 5);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>You May Also Like</h2>

        <div className={styles.navigation}>
          <button className="related-prev">
            <KeyboardArrowLeftRoundedIcon />
          </button>

          <button className="related-next">
            <KeyboardArrowRightRoundedIcon />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = ".related-prev";
          swiper.params.navigation.nextEl = ".related-next";
        }}
        navigation={{
          prevEl: ".related-prev",
          nextEl: ".related-next",
        }}
        spaceBetween={24}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1.15,
            spaceBetween: 16,
          },
          600: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
        }}
      >
        {related.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
