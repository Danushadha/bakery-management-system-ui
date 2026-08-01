import styles from "../components/styles/CreeateVehicleComp.module.css"
import type { VehicleDtls } from "../utils/type"
import { useState } from "react"
import { saveVhcl } from "../api/vhclApi"
import VehicleImg from "../assets/images/vehicleImg.jpg"


function CreeateVehicleComp() {
    const [vehicle, setVehicle] = useState<VehicleDtls>({
        id: 0,
        vehicleNumber: "",
        driverName: "",
        driverId: 0

    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setVehicle((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const saveVhcldtls = async () => {

        try {


            const response = await saveVhcl(vehicle)
            console.log(response.data)



            setVehicle({
                id: 0,
                vehicleNumber: "",
                driverName: "",
                driverId: 0
            })

        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className={styles.mainContent}>


                <div className={styles.formContent}>

                    <div className={styles.formSide}>
                        <h1>Enter Vehicle Details</h1>

                        <div className={styles.formRow}>
                            <label>Vehicle No:-</label>
                            <input type="text" name="vehicleNumber" value={vehicle.vehicleNumber} onChange={handleChange} autoComplete="off" />

                        </div>

                        <div className={styles.formRow}>
                            <label>Driver Name:- </label>

                            <input type="text" name="driverName" value={vehicle.driverName} onChange={handleChange} autoComplete="off" />

                        </div>

                        <div className={styles.btnPannel}>
                            <button onClick={saveVhcldtls}>Save Details</button>

                        </div>

                    </div>

                    <div className={styles.imgside}>
                    <img src={VehicleImg} alt=""/>
                    
                    </div>
                




                </div>




            </div>

        </>
    )
} export default CreeateVehicleComp