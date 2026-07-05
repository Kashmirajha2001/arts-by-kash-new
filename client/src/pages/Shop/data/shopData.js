import maa_saraswati from "../../../assets/images/shop/artwork/maa_saraswati.jpg";

const shopData = [
  {
    id: 1,
    title: "Golden Hour",
    type: "artwork",
    image: maa_saraswati,
    price: 12000,
    featured: true,
    badge: "Featured",
    inStock: true,
  },

  {
    id: 2,
    title: "Pet Portrait",
    type: "artwork",
    image: "",
    price: 8500,
    badge: "Popular",
    featured: false,
    inStock: true,
  },

  {
    id: 3,

    title: "Floral Dreams Print",

    type: "print",

    image: "",

    price: 899,

    badge: "New",

    featured: false,

    inStock: true,
  },

  {
    id: 4,

    title: "Color Pencil Portrait Course",

    type: "course",

    image: "",

    price: 2499,

    badge: "Best Seller",

    featured: true,

    inStock: true,
  },
];

export default shopData;
