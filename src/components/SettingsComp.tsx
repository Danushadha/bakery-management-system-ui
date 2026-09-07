import ItemComp from "../components/CreateIteComp"
import VehicleComp from "../components/CreeateVehicleComp"
import CreateUserComp from "../components/CreateUserComp"
import styles from "../components/styles/SettingsComp.module.css"
function SettingsComp() {

    return (
        <>

            <div className={styles.mainDiv}>
                <ItemComp />
                <VehicleComp />
                <CreateUserComp />
            </div>

        </>
    )
}
export default SettingsComp