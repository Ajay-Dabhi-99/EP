import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUser } from "./authSlice";

const RequireAuth = () => {
  const { user } = useUser();
  const location = useLocation();
  const token = user?.token;
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
