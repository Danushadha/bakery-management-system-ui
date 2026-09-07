import { NavLink } from "react-router-dom"
import styles from "./styles/SideBar.module.css"

import { useAuth } from "../context/AuthContext";
import whiteLogo from "../assets/images/NBLogowhite.jpg"


function SideBar() {

    const { user } = useAuth();
    const userRole = user ?.role ?.replace("ROLE_", "")
    

    return (
        <>
            <div className={styles.sidebar}>

                <div className={styles.userProfile}>

                    <h2>Nethu Bake House</h2>

                    <div className={styles.userProfileImg}>
                        <img src={whiteLogo} alt="" />

                    </div>
                    {user && (
                        <h3>
                            {userRole} - {user.userName}
                        </h3>
                    )}


                </div>
                <div className={styles.sidebarNavBar}>
                    <div className={styles.navLinks}>



                        {user && (
                            <>
                                <NavLink to="/" >Home</NavLink>
                                <NavLink to="crtOrder" >Create Order</NavLink>
                                <NavLink to="/viewOrders" >Sales Records</NavLink>
                                <NavLink to="reports" >Reports</NavLink>

                            </>
                        )}


                        {userRole === "ADMIN" && (
                            <NavLink to="settings"> Settings </NavLink>
                        )}

                    </div>



                </div>




            </div>


        </>
    )


}

export default SideBar