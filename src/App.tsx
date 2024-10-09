import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  createHashRouter,
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
import { useContext, useState } from "react";
import { AuthContext } from "./context/authcontext";
import PaymentPageNavigate from "./modules/User/components/PaymentPageNavigate/PaymentPageNavigate";

function App() {
  const { loginData } = useContext(AuthContext) || {};

  // const getDefaultRouteElement = () => {
  //   if (loginData?.role === "admin") {
  //     return <Navigate to="dashboard/home" replace />;
  //   } else {
  //     return <Navigate to="dashboard/homepage" replace />;
  //   }
  // };

  const routes = createHashRouter([
    {
      path: "",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        // Public Routes: Homepage, AllRooms, RoomDetails accessible to all, including guests
        { path: "homepage", element: <Homepage /> },
        { path: "all-rooms", element: <AllRooms /> },
        { path: "room-details/:roomId", element: <RoomDetail /> },


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

   
        
        // Protected Routes for Admin
        {
          path: "dashboard/home",
          element: (
            <ProtectedRoute >
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/facilities",
          element: (
            <ProtectedRoute >
              <Facilities />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/all-bookings",
          element: (
            <ProtectedRoute >
                 <AllBookings />
           
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/payment/:bookingId",
          element: (
            <ProtectedRoute >
             <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/payment-page",
          element: (
            <ProtectedRoute >
          <PaymentPageNavigate />
            </ProtectedRoute>
          ),
        },
        
     
        {
          path: "dashboard/favorites",
          element: (
            <ProtectedRoute >
              <FavoriteRooms />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/ads-list",
          element: (
            <ProtectedRoute >
              <AdsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/list-booking",
          element: (
            <ProtectedRoute >
              <ListBooking />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/users",
          element: (
            <ProtectedRoute >
              <Users />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/rooms",
          element: (
            <ProtectedRoute >
              <Rooms />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/add-room",
          element: (
            <ProtectedRoute >
              <AddRoom />
            </ProtectedRoute>
          ),
        },


        {
          path: "dashboard/change-password",
          element: (
            <ProtectedRoute >
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
