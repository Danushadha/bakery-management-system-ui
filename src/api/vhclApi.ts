import api from "./axiosInstance"
import type { VehicleDtls} from "../utils/type";

export const saveVhcl= async(vhcl:VehicleDtls)=>{
    return await api.post("/api/vehicleDetailsController", vhcl)
   
}

export const getAllVcl= async()=>{
    return await api.get("/api/vehicleDetailsController")
   
}