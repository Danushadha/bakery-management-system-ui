import { NavLink } from "react-router-dom"
import styles from "./styles/SideBar.module.css"
function SideBar() {


    return (
        <>
            <div className={styles.sidebar}>

                <div className={styles.userProfile}>

                    <h2>Nethu Bake House</h2>

                    <div className={styles.userProfileImg}>


                    </div>
                    <h3>Admin - Mr. Thushara</h3>


                </div>
                <div className={styles.sidebarNavBar}>
                    <div className={styles.navLinks}>

                        <NavLink to="/" >Dash Board</NavLink>
                        <NavLink to="crtOrder" >Create Order</NavLink>
                        <NavLink to="/order" >Sales Records</NavLink>
                        <NavLink to="/reports" >Reports</NavLink>
                        <NavLink to="settings" >Settings</NavLink>

                    </div>



                </div>




            </div>


        </>
    )


}

export default SideBar