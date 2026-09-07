import styles from "./styles/Header.module.css"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Header() {

    const { user , logout} = useAuth();
    const navigate =useNavigate()

    const handleLogout = ()=>{

        logout();
        navigate("/")
    }
    

    return (
        <>

            <div className={styles.header}>
                
                <h1>Bakery Management System</h1>

                
                {user && (
                    <button className={styles.logOutBtn} onClick={(handleLogout)}>Log Out</button>
                )}

                 

            </div>



        </>
    )



}
export default Header