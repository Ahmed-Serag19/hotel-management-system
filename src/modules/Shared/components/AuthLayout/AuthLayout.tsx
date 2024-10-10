import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authcontext";
import { Box } from "@mui/material";
export default function AuthLayout() {
  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/dashboard");
  //   }
  // });

  const { loginData } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  useEffect(() => {
    if (loginData?.role === "admin") {
      navigate("/dashboard/home", { replace: true });
    }
  }, [loginData, navigate]);

  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
