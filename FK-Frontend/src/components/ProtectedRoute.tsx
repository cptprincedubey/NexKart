import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "admin" | "seller";
}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role === "admin" && !user.isAdmin) return <Navigate to="/" />;
  if (role === "seller" && user.role !== "seller") return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
