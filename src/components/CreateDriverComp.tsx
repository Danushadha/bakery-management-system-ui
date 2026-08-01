
import styles from "../components/styles/CreateDriverComp.module.css"
import type { DriverData } from "../utils/type"
import { useState } from "react"
import { saveDriver } from "../api/driverApi"
import DriverImg from "../assets/images/driverImg.jpg"



function CreateDriverComp() {

    const [driverData, setDriverData] = useState<DriverData>({
        id: 0,
        name: "",
        nic: "",
        contactNo: ""
    })

    const validate = () => {

        let valid = true

        if (driverData.name.trim() === "") {
            valid = false
            alert("name cannot be empty")
        }


        return valid

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setDriverData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const saveDriverdtls = async () => {

        try {

            if (!validate) {
                return
            }

            const response = await saveDriver(driverData)
            console.log(response.data)

            setDriverData({
                id: 0,
                name: "",
                nic: "",
                contactNo: ""

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

                    <div className={styles.imgside}>
                    <img src={DriverImg} alt=""/>

                    </div>

                    <div className={styles.formSide}>
                        <h1>Enter Driver Details</h1>

                        <div className={styles.formRow}>
                            <label>Name :-</label>
                            <input type="text" name="name" value={driverData.name} onChange={handleChange} autoComplete="off" />

                        </div>


                        <div className={styles.formRow}>
                            <label>NIC No :- </label>

                            <input type="text" name="nic" value={driverData.nic} onChange={handleChange} autoComplete="off" />

                        </div>
                        <div className={styles.formRow}>
                            <label>Contact No :-</label>
                            <input type="number" name="contactNo"
                                value={driverData.contactNo}
                                onChange={handleChange} autoComplete="off"
                                maxLength={10} />

                        </div>


                        <div className={styles.btnPannel}>
                            <button onClick={saveDriverdtls}>Save Details</button>

                        </div>

                    </div>


                </div>






            </div>

        </>
    )


} export default CreateDriverComp