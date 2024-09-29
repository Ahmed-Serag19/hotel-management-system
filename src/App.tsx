import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AddRoom from "./modules/Admin/components/Rooms/AddRoom";
import AdsList from "./modules/Admin/components/AdsList/AdsList";
import AllRooms from "./modules/User/components/AllRooms/AllRooms";
import FavoriteRooms from "./modules/User/components/FavoriteRooms/FavoriteRooms";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import ChangePassword from "./modules/Auth/components/ChangePassword/ChangePassword";
import Facilities from "./modules/Admin/components/Facilities/Facilities";
import ForgetPassword from "./modules/Auth/components/ForgetPassword/ForgetPassword";
import Home from "./modules/Home/components/Home/Home";
import ListBooking from "./modules/Admin/components/ListBooking/ListBooking";
import Login from "./modules/Auth/components/Login/Login";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Register from "./modules/Auth/components/Register/Register";
import ResetPassword from "./modules/Auth/components/ResetPassword/ResetPassword";
import Rooms from "./modules/Admin/components/Rooms/Rooms";
import Users from "./modules/Admin/components/Users/Users";
import Homepage from "./modules/User/components/Homepage/Homepage";
import { useContext } from "react";
import { AuthContext } from "./context/authcontext";
import RoomDetail from "./modules/User/components/RoomDetails/RoomDetail";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";

function App() {
  const { loginData }: any = useContext(AuthContext);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        // Public Routes: Homepage, AllRooms, RoomDetails accessible to all, including guests
        { path: "homepage", element: <Homepage /> },
        { path: "all-rooms", element: <AllRooms /> },
        { path: "room-details/:roomId", element: <RoomDetail /> },

        // Protected Routes: Only accessible to admins
        {
          path: "home",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "facilities",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Facilities />
            </ProtectedRoute>
          ),
        },
        {
          path: "Ads-list",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "List-booking",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <ListBooking />
            </ProtectedRoute>
          ),
        },
        {
          path: "users",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          ),
        },
        {
          path: "rooms",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Rooms />
            </ProtectedRoute>
          ),
        },
        {
          path: "add-room",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddRoom />
            </ProtectedRoute>
          ),
        },

        // User-specific routes: Only accessible to logged-in users with role 'user' or 'admin'
        {
          path: "favorites",
          element: (
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <FavoriteRooms />
            </ProtectedRoute>
          ),
        },
        {
          path: "change-password",
          element: (
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <ChangePassword />
            </ProtectedRoute>
          ),
        },
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
