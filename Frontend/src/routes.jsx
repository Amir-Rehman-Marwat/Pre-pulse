import {
  createBrowserRouter,
} from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Home from "./features/auth/pages/Home";
import ProtectedRoute from "./hooks/protected";
import Base from "./features/interview/pages/base";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
    
  },
   {
    path: "/register",
    element: <Register/>
    
  },
  {
    path:"/",
    element: <ProtectedRoute><Home/> </ProtectedRoute> 
  },
  {
    path:"/base",
    element:<Base/>
  }
]);