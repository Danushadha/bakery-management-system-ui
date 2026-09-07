import api from "./axiosInstance"
import type { LoginData} from "../utils/type";

export const loginUser= async(user:LoginData)=>{
    return await api.post("/api/authController/login", user)
}

