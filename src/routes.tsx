import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Error from "./pages/error";
import CreatePost from "./pages/post";
import MyPhotos from "./pages/myphotos";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditProfile from "./pages/profile/editProfile";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/post",
        element: <CreatePost />,
        errorElement: <Error />,
      },
      {
        path: "/myphotos",
        element: <MyPhotos />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
        errorElement: <Error />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
]);

export default router;
