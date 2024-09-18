import "./App.css";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import Login from "./modules/Auth/components/Login/Login";
import Register from "./modules/Auth/components/Register/Register";
import ResetPassword from "./modules/Auth/components/ResetPassword/ResetPassword";
import ForgetPassword from "./modules/Auth/components/ForgetPassword/ForgetPassword";
import ChangePassword from "./modules/Auth/components/ChangePassword/ChangePassword";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home/Home";
//import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import {
  createBrowserRouter,
  //  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Facilities from "./modules/Admin/components/Facilities/Facilities";
import AdsList from "./modules/Admin/components/AdsList/AdsList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        //  <ProtectedRoute>
        <MasterLayout />
        //  </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "facilities", element: <Facilities /> },
        { path: "Ads-list", element: <AdsList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
