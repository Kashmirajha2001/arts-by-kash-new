import graphite1 from "../../../assets/images/pricing/graphite1.jpg";
import graphite2 from "../../../assets/images/pricing/graphite2.jpeg";
import graphite3 from "../../../assets/images/pricing/graphite3.jpeg";

import color1 from "../../../assets/images/pricing/color1.jpg";
import color2 from "../../../assets/images/pricing/color2.jpg";
import color3 from "../../../assets/images/pricing/color3.jpg";

import acrylic1 from "../../../assets/images/pricing/acrylic1.jpg";
import acrylic2 from "../../../assets/images/pricing/acrylic2.jpg";
import acrylic3 from "../../../assets/images/pricing/acrylic3.jpg";

const pricing = {
  graphite: {
    title: "Graphite Sketch",

    previewImages: [graphite1, graphite2, graphite3],

    sizes: {
      A4: {
        single: 1199,
        couple: 1699,
        extra: 350,
      },

      A3: {
        single: 1699,
        couple: 2199,
        extra: 400,
      },

      A2: {
        single: 2899,
        couple: 3699,
        extra: 500,
      },
    },
  },

  color: {
    title: "Colour Pencil",

    previewImages: [color1, color2, color3],

    sizes: {
      A4: {
        single: 1799,
        couple: 2299,
        extra: 500,
      },

      A3: {
        single: 2299,
        couple: 2799,
        extra: 650,
      },

      A2: {
        single: 4999,
        couple: 6999,
        extra: 800,
      },
    },
  },

  acrylic: {
    title: "Acrylic Painting",

    custom: true,

    previewImages: [acrylic1, acrylic2, acrylic3],
  },
};

export default pricing;
