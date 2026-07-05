import maa_saraswati from "../../../assets/images/shop/artwork/maa_saraswati.jpg";
import print1 from "../../../assets/images/shop/print/print1.png";
import course1 from "../../../assets/images/course/portrait2.jpeg";
import flora from "../../../assets/images/offers/artworks.jpg";

const shopData = [
  {
    id: 1,
    title: "Maa Saraswati",
    type: "artwork",
    image: maa_saraswati,
    price: 3500,
    featured: true,
    badge: "Featured",
    inStock: true,
  },

  {
    id: 2,
    title: "Flora",
    type: "artwork",
    image: flora,
    price: 3000,
    badge: "Popular",
    featured: false,
    inStock: true,
  },

  {
    id: 3,
    title: "Actress Sketch Prints",
    type: "print",
    image: print1,
    price: 350,
    badge: "New",
    featured: false,
    inStock: true,
  },

  {
    id: 4,
    title: "Color Pencil Portrait Course",
    type: "course",
    image: course1,
    price: 2499,
    badge: "Best Seller",
    featured: true,
    inStock: true,
  },
];

export default shopData;
