import styles from "./styles/Header.module.css"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react"


function Header() {

    const { user, logout } = useAuth();
    const userRole = user ?.role ?.replace("ROLE_", "")
    const navigate = useNavigate()

    const handleLogout = () => {

        logout();
        navigate("/")
    }

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsNavOpen(prev => !prev);
    };


    return (
        <>






            {user && (
                <>
                    <div className={styles.header}>
                        <div className={styles.hamBurgMenu} onClick={handleHamburgerClick}>
                            <span></span>
                            <span></span>
                            <span></span>

                        </div>
                        <h1>Bakery Management System</h1>
                        <button className={styles.logOutBtn} onClick={(handleLogout)}>Log Out</button>

                        <div className={`${styles.navBar} ${
                            isNavOpen ? styles.navBarOpen : ""}`}>
                            
                            <button className={styles.navBarBtn} onClick={() => { navigate("/"); setIsNavOpen(false); }}>Home</button>
                            <button className={styles.navBarBtn} onClick={() => { navigate("crtOrder"); setIsNavOpen(false); }}>Create Orders</button>
                            <button className={styles.navBarBtn} onClick={() => { navigate("viewOrders"); setIsNavOpen(false); }}>View Order</button>
                            <button className={styles.navBarBtn} onClick={() => { navigate("reports"); setIsNavOpen(false); }}>Reports</button>

                            {userRole === "ADMIN" && (
                                <button className={styles.navBarBtn} onClick={() => { navigate("settings"); setIsNavOpen(false); }}>Settings</button>
                            )}

                        </div>
                    </div>
                </>)}







        </>
    )



}
export default Header