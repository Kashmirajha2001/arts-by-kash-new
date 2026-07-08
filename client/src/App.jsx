import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import CoursesPage from "./pages/Courses/Courses";
import AboutPage from "./pages/AboutPage/About";
import ContactPage from "./pages/Contact/Contact";
import ScrollToTop from "./constants/ScrollToTop";
import Auth from "./pages/Auth/Auth";
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Commissions from "./pages/Commissions/Commissions";
import GalleryPage from "./pages/Gallery/Gallery";
import MyAccount from "./pages/MyAccount/MyAccount";
import Product from "./pages/Shop/Product/Product";
import Wishlist from "./pages/Wishlist/Wishlist";
import CartDrawer from "./pages/Cart/CartDrawer/CartDrawer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* <Route path="/blog" element={<BlogPage />} /> */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/commissions" element={<Commissions />} />
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <Auth />
            </GuestRoute>
          }
        />
        {/* Dashboard Wishlist Orders Courses Profile */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
