export const authFormVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,

    transition: {
      duration: 0.25,
    },
  },
};