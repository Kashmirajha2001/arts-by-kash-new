import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";
import ShopHeader from "./ShopHeader/ShopHeader";
import CategoryTabs from "./CategoryTabs/CategoryTabs";
import ProductGrid from "./ProductGrid/ProductGrid";
import ShopToolbar from "./ShopToolbar/ShopToolbar";
import MobileBottomSheet from "./MobileBottomSheet/MobileBottomSheet";

import { useState } from "react";
import categories from "./data/categories";
import styles from "./Shop.module.css";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

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
      <ShopToolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        setFilterOpen={setFilterOpen}
        setSortOpen={setSortOpen}
      />
      <ProductGrid
        activeCategory={activeCategory}
        search={search}
        sort={sort}
      />

      <MobileBottomSheet
        open={filterOpen}
        title="Filters"
        onClose={() => setFilterOpen(false)}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={
              activeCategory === category.id
                ? styles.sheetActive
                : styles.sheetButton
            }
            onClick={() => {
              setActiveCategory(category.id);
              setFilterOpen(false);
            }}
          >
            {category.label}
          </button>
        ))}
      </MobileBottomSheet>

      <MobileBottomSheet
        open={sortOpen}
        title="Sort By"
        onClose={() => setSortOpen(false)}
      >
        <button
          onClick={() => {
            setSort("latest");
            setSortOpen(false);
          }}
        >
          Latest
        </button>

        <button
          onClick={() => {
            setSort("low-high");
            setSortOpen(false);
          }}
        >
          Price: Low to High
        </button>

        <button
          onClick={() => {
            setSort("high-low");
            setSortOpen(false);
          }}
        >
          Price: High to Low
        </button>

        <button
          onClick={() => {
            setSort("name");
            setSortOpen(false);
          }}
        >
          Name (A-Z)
        </button>
      </MobileBottomSheet>
    </>
  );
}
