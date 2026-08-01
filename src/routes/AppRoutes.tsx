import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import DriverComp from "../components/CreateDriverComp"
import SettingsComp from "../components/SettingsComp"
import CreateOrderComponent from "../components/CreateOrderComponent"
import RportsComp from "../components/RportsComp"
import ItemComp from "../components/CreateIteComp"

function AppRoutes() {


    return (
        <>

            <BrowserRouter>
                <Routes>
                    

                    <Route path="/" element={<HomePage />}>
                       
                        <Route path="/item" element={<ItemComp />} />
                        <Route path="/driver" element={<DriverComp />} />
                        <Route path="/settings" element={<SettingsComp />} />
                        <Route path="/crtOrder" element={<CreateOrderComponent />} />
                        <Route path="/reports" element={<RportsComp />} />

                    </Route>


                </Routes>

            </BrowserRouter>
        </>
    )


}
export default AppRoutes