import { Outlet } from "react-router-dom"
import styles from "./HomePage.module.css"
import Header from "../components/Header"
import SideBar from "../components/SideBar"


function HomePage() {



    return (
        <>

            <div className={styles.mainContainer}>

                <SideBar />
                <Header />

                <div className={styles.contentArea}>
                    <Outlet />
                    


                </div>
            </div>


        </>
    )
}
export default HomePage