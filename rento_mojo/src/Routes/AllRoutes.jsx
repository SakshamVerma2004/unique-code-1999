import { Route, Routes } from "react-router-dom"
import HomePage from "../Pages/HomePage"
import IndiviualCategory from "../Pages/IndiviualCategory";
import IndiviualProduct from "../Pages/IndiviualProduct";
import Cart from "../Pages/Cart";
import Admin from "../Pages/Admin";

let AllRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/:category" element={<IndiviualCategory/>}></Route>
            <Route path="/:category/:name" element={<IndiviualProduct/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
        </Routes>
    )
}
export default AllRoutes;