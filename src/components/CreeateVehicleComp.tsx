import styles from "../components/styles/CreeateVehicleComp.module.css"
import type { VehicleDtls } from "../utils/type"
import { useState } from "react"
import { saveVhcl, getAllVcl , updtVhcl } from "../api/vhclApi"
import VehicleImg from "../assets/images/vehicleImg.jpg"


function CreeateVehicleComp() {
    const [vehicle, setVehicle] = useState<VehicleDtls>({
        id: 0,
        vehicleNumber: "",
        driverName: "",
        driverId: 0,
        rent: 0

    })
    const [changeName, setChangName] = useState("Save Vehicle")
    const [loadedVhcls, setLoadedVhcls] = useState<VehicleDtls[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setVehicle((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const crudHandle = async () => {


        try {

            if (changeName === "Save Vehicle") {
                const response = await saveVhcl(vehicle)
                console.log(response.data)


            }

            if(changeName === "Update Vehicle"){
                if(vehicle.id<1){
                    alert("you've not selected a vehicle")
                    return

                }

                const response = await updtVhcl(vehicle)
                console.log(response.data)

                
            }






            setVehicle({
                id: 0,
                vehicleNumber: "",
                driverName: "",
                driverId: 0,
                rent: 0
            })

        }
        catch (error) {
            console.log(error)
        }

    }
    const loadAllVhcls = async () => {

        const response = await getAllVcl()
        console.log(response.data)

        setLoadedVhcls(response.data)

    }

    const editVhcl = async () => {

        setChangName("Update Vehicle")
        await loadAllVhcls()

    }

    const clsEdit = async () => {

        setChangName("Save Vehicle")

        setVehicle({
            id: 0,
            vehicleNumber: "",
            driverName: "",
            driverId: 0,
            rent: 0
        })


    }



    return (
        <>
            <div className={styles.mainContent}>


                <div className={styles.formContent}>
                    <div className={styles.crudBtns}>
                        <button onClick={editVhcl}>Edit</button>

                    </div>

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

                        <div className={styles.formRow}>
                            <label>Rent :- </label>

                            <input type="number" name="rent" value={vehicle.rent} onChange={handleChange} autoComplete="off" />

                        </div>

                        <div className={styles.btnPannel}>
                            <button onClick={crudHandle}>{changeName}</button>

                        </div>

                    </div>

                    <div className={styles.imgside}>


                        <div className={styles.allVhclDiv}>

                            {changeName == "Update Vehicle" && (
                                <>
                                    <div className={styles.updtVhcHeading}>
                                        <p>Select Vehicle </p>
                                        <button className={styles.clsBtn} onClick={clsEdit}>X</button>
                                    </div>

                                    <div className={styles.vhclTbl}>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Vehicle No</th>
                                                    <th>Driver Name</th>
                                                    <th>Rent</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {

                                                    loadedVhcls.map((vhcl, index) => (

                                                        <tr key={vhcl.id}>

                                                            <td><button className={styles.eidtBtn} onClick={() => setVehicle(vhcl)}>{index + 1}</button></td>
                                                            <td><button className={styles.eidtBtn} onClick={() => setVehicle(vhcl)}>{vhcl.vehicleNumber}</button></td>
                                                            <td><button className={styles.eidtBtn} onClick={() => setVehicle(vhcl)}>{vhcl.driverName}</button></td>
                                                            <td><button className={styles.eidtBtn} onClick={() => setVehicle(vhcl)}>{Number(vhcl.rent).toFixed(2)}</button></td>

                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>

                                    </div>


                                </>
                            )}



                        </div>
                        <img src={VehicleImg} alt="" />


                    </div>





                </div>




            </div>

        </>
    )
} export default CreeateVehicleComp