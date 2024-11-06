import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Logout from "./Pages/Logout";
import RouteProtection from "./Components/RouteProtection";
import AddProduct from "./Pages/AddProduct";
import VendorRouteProtection from "./Components/VendorRouteProtection";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<RouteProtection cmp={Dashboard}/>}/>
          <Route path="/addproduct" element={<VendorRouteProtection cmp={AddProduct}/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
