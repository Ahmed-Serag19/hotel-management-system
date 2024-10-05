import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import AddRoom from "./modules/Admin/components/Rooms/AddRoom";
import AdsList from "./modules/Admin/components/AdsList/AdsList";
import AllBookings from "./modules/User/components/AllBookings/AllBookings";
import AllRooms from "./modules/User/components/AllRooms/AllRooms";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import ChangePassword from "./modules/Auth/components/ChangePassword/ChangePassword";
import Facilities from "./modules/Admin/components/Facilities/Facilities";
import FavoriteRooms from "./modules/User/components/FavoriteRooms/FavoriteRooms";
import ForgetPassword from "./modules/Auth/components/ForgetPassword/ForgetPassword";
import Home from "./modules/Home/components/Home/Home";
import Homepage from "./modules/User/components/Homepage/Homepage";
import ListBooking from "./modules/Admin/components/ListBooking/ListBooking";
import Login from "./modules/Auth/components/Login/Login";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Payment from "./modules/User/components/Payment/Payment";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import Register from "./modules/Auth/components/Register/Register";
import ResetPassword from "./modules/Auth/components/ResetPassword/ResetPassword";
import RoomDetail from "./modules/User/components/RoomDetails/RoomDetail";
import Rooms from "./modules/Admin/components/Rooms/Rooms";
import Users from "./modules/Admin/components/Users/Users";
import { useContext } from "react";

import { AuthContext } from "./context/authcontext";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const { loginData } = useContext(AuthContext) || {};

  const getDefaultRouteElement = () => {
    if (loginData === null) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (loginData?.role === "admin") {
      return <Navigate to="dashboard/home" replace />;
    } else {
      return <Navigate to="dashboard/homepage" replace />;
    }
  };

  const routes = createBrowserRouter([
    {
      path: "",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        // Public Routes: Homepage, AllRooms, RoomDetails accessible to all, including guests
        { path: "homepage", element: <Homepage /> },
        { path: "all-rooms", element: <AllRooms /> },
        { path: "room-details/:roomId", element: <RoomDetail /> },
        { path: "dashboard/all-bookings", element: <AllBookings /> },
        { path: "payment/:bookingId ", element: <Payment /> },
        // Protected Routes: Only accessible to admins
        {
          index: true,
          element: getDefaultRouteElement(), // Decide where to redirect based on the role
        },

        // Public Routes
        {
          path: "dashboard/homepage",
          element:
            loginData?.role === "admin" ? (
              <Navigate to="dashboard/home" replace />
            ) : (
              <Homepage />
            ),
        },
        { path: "dashboard/all-rooms", element: <AllRooms /> },
        { path: "dashboard/room-details/:roomId", element: <RoomDetail /> },
        { path: "dashboard/payment/:bookingId", element: <Payment /> },

        // Protected Routes for Admin
        {
          path: "dashboard/home",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/facilities",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Facilities />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/ads-list",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/list-booking",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <ListBooking />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/users",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/rooms",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Rooms />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/add-room",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddRoom />
            </ProtectedRoute>
          ),
        },

        // User-specific routes for logged-in users
        {
          path: "dashboard/favorites",
          element: (
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <FavoriteRooms />
            </ProtectedRoute>
          ),
        },

        {
          path: "dashboard/change-password",
          element: (
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <ChangePassword />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Navigate to="login" replace /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
