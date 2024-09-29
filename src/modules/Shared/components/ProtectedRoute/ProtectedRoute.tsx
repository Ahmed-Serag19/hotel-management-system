import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/authcontext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { loginData }: any = useContext(AuthContext);

  if (!loginData || !allowedRoles.includes(loginData.role)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
