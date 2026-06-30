import { useSearchParams } from "react-router-dom";

import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

import styles from "./Auth.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { authFormVariants } from "../../animations/authFormVariants";
import GoogleButton from "./GoogleButton/GoogleButton";

import botanical from "../../assets/textures/botanical.png";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode") || "login";

  return (
    <section className={styles.page}>
      <img src={botanical} alt="" className={styles.botanical} />
      <img src={botanical} alt="" className={styles.botanicalRight} />

      <div className={styles.card}>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode + "-header"}
            variants={authFormVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1>
              {mode === "login"
                ? "Welcome Back"
                : mode === "register"
                  ? "Begin Your Artistic Journey"
                  : "Reset Your Password"}
            </h1>

            <p className={styles.subtitle}>
              {mode === "login"
                ? "Continue creating beautiful artworks."
                : mode === "register"
                  ? "Create your account and start learning realistic portrait drawing."
                  : "We'll help you get back into your account."}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.tabs}>
          <button
            onClick={() => setSearchParams({ mode: "login" })}
            className={mode === "login" ? styles.active : ""}
          >
            Sign In
          </button>

          <button
            onClick={() =>
              setSearchParams({
                mode: "register",
              })
            }
            className={mode === "register" ? styles.active : ""}
          >
            Create Account
          </button>
        </div>

        <div className={styles.formArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              variants={authFormVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {mode === "login" && <LoginForm />}
              {mode === "register" && <RegisterForm />}
              {mode === "forgot" && <ForgotPassword />}
            </motion.div>
          </AnimatePresence>
        </div>
        <GoogleButton />
      </div>
    </section>
  );
}
