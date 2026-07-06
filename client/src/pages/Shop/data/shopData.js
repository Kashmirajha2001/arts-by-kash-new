import maa_saraswati from "../../../assets/images/shop/artwork/maa_saraswati.jpg";
import print1 from "../../../assets/images/shop/print/print1.png";
import course1 from "../../../assets/images/course/portrait2.jpeg";
import flora from "../../../assets/images/offers/artworks.jpg";

const shopData = [
  {
    id: 1,
    title: "Maa Saraswati",
    type: "artwork",
    image: [maa_saraswati, print1, course1, flora],
    price: 3500,
    medium: "Acrylic on Canvas",
    size: "8 x 10 Inches",
    frame: "Canvas Board",
    availability: "Ready to Ship",
    badge: "Featured",
    description: [
      "Hand-painted using premium acrylic paints.",
      "Finished with archival protective varnish.",
      "Certificate of authenticity included.",
      "Signed by the artist.",
      "Professionally packed for safe delivery.",
    ],
  },

  {
    id: 2,
    title: "Flora",
    type: "artwork",
    image: [flora],
    price: 3000,
    badge: "Popular",
    featured: false,
    inStock: true,
  },

  {
    id: 3,
    title: "Actress Sketch Prints",
    type: "print",
    image: [print1],
    price: 350,
    badge: "New",
    featured: false,
    inStock: true,
  },

  {
    id: 4,
    title: "Color Pencil Portrait Course",
    type: "course",
    image: [course1],
    price: 2499,
    badge: "Best Seller",
    featured: true,
    inStock: true,
  },
];

export default shopData;
