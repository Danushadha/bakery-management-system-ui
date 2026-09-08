import styles from "../components/styles/LoginFormComp.module.css"
import { useState } from "react";
import { loginUser } from "../api/loginApi"
import { useAuth } from "../context/AuthContext";
import whiteLogo from "../assets/images/NBLogowhite.jpg"
import type { LoginData } from "../utils/type";


function LoginFormComp() {


    const [userData, setUserData] = useState<LoginData>({

        userName: "",
        password: ""

    })

    const [errorMsg, setErrorMsg] = useState("")

    const validate = () => {

        let valid = true

        if (userData.userName.trim() === "") {
            valid = false
            setErrorMsg("User Name or Password cannot be empty");
        }

        if (userData.password.trim() === "") {
            valid = false
            setErrorMsg("User Name or Password cannot be empty");
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

    const { user, login } = useAuth();

    const logUser = async () => {

        setErrorMsg("");

        try {

            if (!validate()) {
                return
            }

            const response = await loginUser(userData)
            login(response.data);

            console.log(response.data)

            setUserData({

                userName: "",
                password: ""

            })

            


        }
        catch (error: any) {

            if (error.response) {

                setErrorMsg(error.response.data)
            }

            else {
                setErrorMsg("Something went wrong")
            }



        }

    }



    return (
        <>
            <div className={styles.mainDiv}>

                <div className={styles.orderSelectDiv}>


                    {!user && (
                        <>
                            <h1>Login</h1>
                            {errorMsg && (
                                <p>{errorMsg}</p>
                            )}

                            <div className={styles.formRow}>
                                <label>Name:-</label>
                                <input type="text" name="userName"
                                    value={userData.userName} onChange={handleChange} autoComplete="off" />

                            </div>


                            <div className={styles.formRow}>
                                <label>Password :- </label>

                                <input type="password" name="password"
                                    autoComplete="off"
                                    value={userData.password} onChange={handleChange} />

                            </div>
                            <div className={styles.btnPannel}>
                                <button onClick={logUser} >Login</button>

                            </div>
                        </>
                    )}

                    {user&&(
                        <>
                        <h1>Welcome</h1>
                        <div className={styles.userProfileImg}>
                        <img src={whiteLogo} alt=""/>

                    </div>

                        <h2>{user.userName}</h2>
                        </>
                    )}


                </div>

            </div>

        </>
    )
}
export default LoginFormComp
