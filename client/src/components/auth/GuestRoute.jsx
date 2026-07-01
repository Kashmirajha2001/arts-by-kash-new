import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../ui/Loader/Loader";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
