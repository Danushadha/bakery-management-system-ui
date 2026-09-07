
import styles from "../components/styles/CreateUserComp.module.css"
import type { UserData } from "../utils/type"
import { useState } from "react"
import { saveUser } from "../api/userApi"
import DriverImg from "../assets/images/driverImg.jpg"



function CreateUserComp() {

    const [userData, setUserData] = useState<UserData>({
        id: 0,
        userName: "",
        password: ""
        
    })

    const validate = () => {

        let valid = true

        if (userData.userName.trim() === "") {
            valid = false
            alert("name cannot be empty")
        }


        return valid

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const saveUserDtls = async () => {

        try {

            if (!validate) {
                return
            }

            const response = await saveUser(userData)
            console.log(response.data)

            setUserData({
                id: 0,
                userName: "",
                password: ""

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
                        <h1>Enter User Details</h1>

                        <div className={styles.formRow}>
                            <label>User Name :-</label>
                            <input type="text" name="userName" value={userData.userName} onChange={handleChange} autoComplete="off" />

                        </div>


                        <div className={styles.formRow}>
                            <label>Password :- </label>

                            <input type="text" name="password" value={userData.password} onChange={handleChange} autoComplete="off" />

                        </div>
                       


                        <div className={styles.btnPannel}>
                            <button onClick={saveUserDtls}>Save User</button>

                        </div>

                    </div>


                </div>






            </div>

        </>
    )


} export default CreateUserComp