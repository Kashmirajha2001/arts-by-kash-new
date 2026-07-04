import graphite1 from "../../../assets/images/gallery/graphite/graphite1.jpg";
import graphite2 from "../../../assets/images/gallery/graphite/graphite2.jpeg";
import graphite3 from "../../../assets/images/gallery/graphite/graphite3.jpeg";

import color1 from "../../../assets/images/gallery/colour-pencil/color1.jpg";
import color2 from "../../../assets/images/gallery/colour-pencil/color2.jpg";
import color3 from "../../../assets/images/gallery/colour-pencil/color3.jpg";

import acrylic1 from "../../../assets/images/gallery/acrylic/acrylic1.jpg";
import acrylic2 from "../../../assets/images/gallery/acrylic/acrylic2.jpg";
import acrylic3 from "../../../assets/images/gallery/acrylic/acrylic3.jpg";
import acrylic4 from "../../../assets/images/gallery/acrylic/acrylic4.jpg";
import acrylic5 from "../../../assets/images/gallery/acrylic/acrylic5.jpg";

import pet1 from "../../../assets/images/gallery/pets/pet1.jpg";

import jacket1 from "../../../assets/images/gallery/jackets/jacket1.jpg";

const galleryData = [
  {
    id: 1,
    title: "Sister Portrait",
    category: "Colour Pencil",
    medium: "Colour Pencil",
    image: color1,
    size: "A4",
    people: "Couple",
    featured: true,
  },
  {
    id: 7,
    title: "Pet Portrait",
    category: "Acrylic",
    medium: "Acrylic",
    image: acrylic4,
    size: "18 × 24 in",
    // people: "N/A",
    featured: false,
  },

  {
    id: 2,
    title: "Grandfather Sketch",
    category: "Graphite",
    medium: "Graphite",
    image: graphite1,
    size: "A4",
    people: "Single",
    featured: false,
  },

  {
    id: 3,
    title: "Wedding Portrait",
    category: "Colour Pencil",
    medium: "Colour Pencil",
    image: color2,
    size: "A2",
    people: "Couple",
    featured: true,
  },

  {
    id: 4,
    title: "Saraswati Painting",
    category: "Acrylic",
    medium: "Acrylic",
    image: acrylic1,
    size: "8 × 10 in",
    // people: "N/A",
    featured: false,
  },

  {
    id: 5,
    title: "Maa Durga Painting",
    category: "Acrylic",
    medium: "Acrylic",
    image: acrylic5,
    size: "A4",
    // people: "Pet",
    featured: false,
  },

//   {
//     id: 5,
//     title: "Maa Durga Painting",
//     category: "Pets",
//     medium: "Colour Pencil",
//     image: pet1,
//     size: "A4",
//     people: "Pet",
//     featured: false,
//   },

//   {
//     id: 6,
//     title: "Custom Denim Jacket",
//     category: "Jackets",
//     medium: "Acrylic",
//     image: jacket1,
//     size: "Free Size",
//     people: "N/A",
//     featured: false,
//   },
  
];

export default galleryData;