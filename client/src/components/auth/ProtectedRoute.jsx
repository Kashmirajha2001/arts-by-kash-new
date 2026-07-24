import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../ui/Loader/Loader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <Navigate to="/auth?mode=login" state={{ from: location }} replace />
    );
  }

  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}
