import { Route, Routes } from "react-router-dom"
import HomePage from "../Pages/HomePage"
import IndiviualCategory from "../Pages/IndiviualCategory";

let AllRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/:category" element={<IndiviualCategory/>}></Route>
        </Routes>
    )
}
export default AllRoutes;