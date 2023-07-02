import { createHashRouter } from "react-router-dom";
import Login from "./pages/login";
import Test from "./pages/test";

export const router = createHashRouter([{
  path:'/',
  element:<Login></Login>
},{
  path:'/test',
  element:<Test></Test>
}])