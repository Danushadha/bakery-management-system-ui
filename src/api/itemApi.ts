    import api from "./axiosInstance"
    import type { ItemData} from "../utils/type";

    export const saveItem= async(item:ItemData)=>{
        return await api.post("/api/itemDetailsController", item)
    
    }
    export const updateItem= async(item:ItemData)=>{
        return await api.post("/api/itemDetailsController/update", item)
    
    }
    export const disableItem= async(item:ItemData)=>{
        return await api.post("/api/itemDetailsController/disable", item)
    
    }


    export const getAllItems = async () => {
        return await api.get("/api/itemDetailsController");
    };

