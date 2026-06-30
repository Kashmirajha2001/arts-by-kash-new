import styles from "./Footer.module.css";

import navigation from "../../../constants/navigation";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";

import { FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top CTA */}

      <motion.div
        className={styles.topBar}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className={styles.topText}>
          {/* <div className={styles.topDecor}>
            <span></span> ✦ <span></span>
          </div> */}

          <h3>Turn Your Memories Into Timeless Artworks.</h3>
        </div>

        <PrimaryButton to="/contact">Book Your Commission</PrimaryButton>
      </motion.div>

      {/* Main Footer */}

      <motion.div
        className={styles.main}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Left */}

        <div className={styles.brand}>
          <NavLink to="/"><h2>Arts by Kash</h2></NavLink>

          <p>
            Handmade portraits, meaningful artworks and creative learning
            experiences.
          </p>
        </div>

        {/* Links */}

        <div className={styles.center}>
          <div className={styles.icons}>
            <a href="https://www.instagram.com/artsbykash/" target="_blank">
              <FaInstagram />
            </a>
            <a href="#" target="_blank">
              <FaYoutube />
            </a>
            <a href="https://pin.it/5zBq1MQlh" target="_blank">
              <FaPinterest />
            </a>
          </div>

          <div className={styles.linksGrid}>
            <a href="/">Home</a>
            <a href="/gallery">Gallery</a>
            <a href="/courses">Courses</a>
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>
        </div>

        {/* Services */}

        <div className={styles.services}>
          <h4>Available For</h4>

          <p>✓ Portrait Commissions</p>

          <p>✓ Original Artworks</p>

          <p>✓ Online Courses</p>
        </div>
      </motion.div>

      {/* Bottom */}

      <motion.div
        className={styles.bottom}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        © 2026 Arts by Kash • All Rights Reserved.
      </motion.div>
    </footer>
  );
}
