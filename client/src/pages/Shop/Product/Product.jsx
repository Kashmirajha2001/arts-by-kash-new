import { useParams } from "react-router-dom";

import shopData from "../data/shopData";
import PageHero from "../../../components/shared/PageHero/PageHero";
import HeroImage from "../../../assets/images/hero/courses-hero.jpg";

import ProductGallery from "./ProductGallery/ProductGallery";
import ProductInfo from "./ProductInfo/ProductInfo";

import styles from "./Product.module.css";

export default function Product() {
  const { id } = useParams();

  const product = shopData.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  return (
    <>
      <PageHero
        title="Shop"
        breadcrumb="Original artworks, prints & courses"
        image={HeroImage}
      />
      <section className={styles.product}>
        <div className={styles.container}>
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </div>
      </section>
    </>
  );
}
