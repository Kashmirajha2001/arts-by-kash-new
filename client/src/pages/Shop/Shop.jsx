import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";
import ShopHeader from "./ShopHeader/ShopHeader";
import CategoryTabs from "./CategoryTabs/CategoryTabs";
import ProductGrid from "./ProductGrid/ProductGrid";

import { useState } from "react";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      <PageHero
        title="Shop"
        breadcrumb="Original artworks, prints & courses"
        image={HeroImage}
      />
      <ShopHeader />
      <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ProductGrid activeCategory={activeCategory}/>
    </>
  );
}
