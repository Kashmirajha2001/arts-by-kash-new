import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";

import GalleryTabs from "./GalleryTabs/GalleryTabs";
import { useMemo, useState } from "react";
import GalleryGrid from "./GalleryGrid/GalleryGrid";
import GalleryModal from "./GalleryModal/GalleryModal";

import galleryData from "./data/galleryData";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const filteredArtworks = useMemo(() => {
    if (activeCategory === "All") return galleryData;

    return galleryData.filter((artwork) => artwork.category === activeCategory);
  }, [activeCategory]);
  return (
    <>
      <PageHero
        title="Gallery"
        breadcrumb="Explore Handcrafted Works of Art"
        image={HeroImage}
      />

      <GalleryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <GalleryGrid artworks={filteredArtworks} onOpen={setSelectedArtwork} />

      <GalleryModal
        artwork={selectedArtwork}
        artworks={filteredArtworks}
        onClose={() => setSelectedArtwork(null)}
      />
    </>
  );
}
