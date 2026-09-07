import api from "./axiosInstance"
import type { UserData} from "../utils/type";

export const saveUser= async(user:UserData)=>{
    return await api.post("/api/authController/saveUser", user)
}

