import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/dashboard");
  //   }
  // });

  return (
    <div>
      <Outlet />
    </div>
  );
}
