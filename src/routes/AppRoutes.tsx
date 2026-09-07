import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage"
import CreateUserComp from "../components/CreateUserComp"
import SettingsComp from "../components/SettingsComp"
import CreateOrderComponent from "../components/CreateOrderComponent"
import RportsComp from "../components/RportsComp"
import ItemComp from "../components/CreateIteComp"
import ViewOrdersComponent from "../components/ViewOrdersComponent"
import LoginFormComp from "../components/LoginFormComp"

function AppRoutes() {

    return (
        <>

            
                <Routes>
                    
    
                    <Route path="/" element={<HomePage />}>

                       <Route index element={<LoginFormComp />} />
                        <Route path="/item" element={<ItemComp />} />
                        <Route path="/driver" element={<CreateUserComp />} />
                        <Route path="/settings" element={<SettingsComp />} />
                        <Route path="/crtOrder" element={<CreateOrderComponent />} />
                        <Route path="/viewOrders" element={<ViewOrdersComponent />} />
                        <Route path="/reports" element={<RportsComp />} />

                    </Route>


                </Routes>

            
        </>
    )


}
export default AppRoutes