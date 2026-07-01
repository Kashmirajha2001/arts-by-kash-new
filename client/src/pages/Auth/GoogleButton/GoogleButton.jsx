import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../../../hooks/useAuth";
import { showSuccess, showError } from "../../../utils/toast";
import styles from "./GoogleButton.module.css";

export default function GoogleButton() {
  const { googleLogin } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const user = await googleLogin(credentialResponse.credential);

      showSuccess(`Welcome back, ${user.name.split(" ")[0]}! ✨`);
    } catch (error) {
      showError(error.response?.data?.message || "Google login failed.");
    }
  };

  return (
    <>
      <div className={styles.divider}>
        <span>OR</span>
      </div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => showError("Google Sign-In failed.")}
        useOneTap={false}
      />
    </>
  );
}

// import { FcGoogle } from "react-icons/fc";

// import styles from "./GoogleButton.module.css";

// export default function GoogleButton() {
//   return (
//     <>
//       <div className={styles.divider}>
//         <span>OR</span>
//       </div>

//       <button type="button" className={styles.googleButton}>
//         <FcGoogle />
//         Continue with Google
//       </button>
//     </>
//   );
// }
