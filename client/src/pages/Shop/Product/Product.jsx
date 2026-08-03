import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHero from "../../../components/shared/PageHero/PageHero";
import HeroImage from "../../../assets/images/hero/courses-hero.jpg";
import Loader from "../../../components/ui/Loader/Loader";
import { getProduct } from "../../../services/productService";

import ProductGallery from "./ProductGallery/ProductGallery";
import ProductInfo from "./ProductInfo/ProductInfo";
import ProductBreadcrumb from "./ProductBreadcrumb/ProductBreadcrumb";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

import styles from "./Product.module.css";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        const data = await getProduct(id);

        if (isMounted) {
          setProduct(data);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <Loader />;

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
        <ProductBreadcrumb product={product} />
        <div className={styles.container}>
          <ProductGallery key={product.id} product={product} />

          <ProductInfo product={product} />
        </div>
        <RelatedProducts currentId={product.id} />
      </section>
    </>
  );
}
