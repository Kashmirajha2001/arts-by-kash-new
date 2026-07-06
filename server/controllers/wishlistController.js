import User from "../models/User.js";

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    const id = Number(productId);

    const exists = user.wishlist.includes(id);

    if (exists) {
      user.wishlist = user.wishlist.filter((item) => item !== id);
    } else {
      user.wishlist.push(id);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: exists ? "Removed from wishlist." : "Saved to wishlist ❤️",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
