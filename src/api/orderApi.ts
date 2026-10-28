import api from "./axiosInstance"
import type { orderedRequestDTO } from "../utils/type.ts"


export const saveMorningOrder = async (orderDtls: orderedRequestDTO) => {
    return await api.post("/api/orderControler/morning", orderDtls)
}

export const saveEveningOrder = async (orderDtls: orderedRequestDTO) => {
    return await api.post("/api/orderControler/evening", orderDtls)
}

export const getOrderByVehicleAndDate = async (vehicleId: number, orderDate: string) => {
    return await api.get("/api/orderControler/getOrderByVehicleAndDate",
     {
        params:{

            vehicleId,
            orderDate

        }
    })
    }

    export const getCloseAndInvoiceDtls = async(orderId:number)=>{
        return await api.get(`/api/orderControler/closeOrder/${ orderId }`)
    }

    export const getOrderByDate = async ( startDate: string, endDate: string) => {
    
        return await api.get("/api/orderControler/getOrders", {
            params: {
                startDate,
                endDate
            }
        })
    }
