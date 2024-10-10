import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  loginData?: any;
}

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   allowedRoles: string[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   allowedRoles,
// }) => {
//   const { loginData }: any = useContext(AuthContext);

//   if (!loginData || !allowedRoles.includes(loginData.role)) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

export default function ProtectedRoute({
  loginData,
  children,
}: ProtectedRouteProps) {
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to="/dashboard/homepage" />;
}
