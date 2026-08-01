import ItemComp from "../components/CreateIteComp"
import VehicleComp from "../components/CreeateVehicleComp"
import Driver from "../components/CreateDriverComp"
import styles from "../components/styles/SettingsComp.module.css"
function SettingsComp() {

    return (
        <>

            <div className={styles.mainDiv}>
                <ItemComp />
                <VehicleComp />
                <Driver />
            </div>

        </>
    )
}
export default SettingsComp