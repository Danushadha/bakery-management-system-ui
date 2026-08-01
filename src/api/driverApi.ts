import api from "./axiosInstance"
import type { DriverData} from "../utils/type";

export const saveDriver= async(driver:DriverData)=>{
    return await api.post("/api/DriverDetailsController", driver)
}

export const getAllDrivers = async () => {
    return await api.get("/api/DriverDetailsController");
};
