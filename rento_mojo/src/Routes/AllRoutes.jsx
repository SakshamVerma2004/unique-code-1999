import { Route, Routes } from "react-router-dom"
import { useMemo } from "react";
import HomePage from "../Pages/HomePage"
import IndiviualCategory from "../Pages/IndiviualCategory";
import IndiviualProduct from "../Pages/IndiviualProduct";

let AllRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/:category" element={<IndiviualCategory/>}></Route>
            <Route path="/:category/:name" element={<IndiviualProduct/>}></Route>
        </Routes>
    )
}
export default AllRoutes;