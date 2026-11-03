import api from "./axiosInstance"
import type { VehicleDtls} from "../utils/type";

export const saveVhcl= async(vhcl:VehicleDtls)=>{
    return await api.post("/api/vehicleDetailsController/save", vhcl)
   
}

export const updtVhcl= async(vhcl:VehicleDtls)=>{
    return await api.post("/api/vehicleDetailsController/update", vhcl)
   
}

export const getAllVcl= async()=>{
    return await api.get("/api/vehicleDetailsController")
   
}   