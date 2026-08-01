import styles from "./styles/Header.module.css"
import {NavLink} from "react-router-dom"

function Header() {


    return (
        <>

            <div className={styles.header}>
                <h1>Bakery Management System</h1>

                <div className={styles.headerNavBar}>
                    <NavLink to = "/crtOrder" > Create Order</NavLink> / 
                    <NavLink to = "/viewOrder"> View Orders </NavLink>
                
                </div>

                <button className={styles.logOutBtn}>Log Out</button>

            </div>



        </>
    )



}
export default Header