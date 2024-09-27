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
import RoomDetail from "./modules/User/components/RoomDetails/RoomDetail";

//import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";

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
        { path: "homepage", element: <Homepage /> },
        { path: "facilities", element: <Facilities /> },
        { path: "Ads-list", element: <AdsList /> },
        { path: "List-booking", element: <ListBooking /> },
        { path: "users", element: <Users /> },
        { path: "rooms", element: <Rooms /> },
        { path: "add-room", element: <AddRoom /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "all-rooms", element: <AllRooms /> },
        { path: "favorite-room", element: <FavoriteRooms /> },
        { path: "room-details", element: <RoomDetail /> },
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
