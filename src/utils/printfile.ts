import type {ItemData, VehicleDtls} from "./type"


type printOrderData ={

    orderId: number | null
    orderNo: string
    ordeerStatus:string
    vehicle:VehicleDtls | null
    morningItems: ItemData []
    evenngItems: ItemData []


}

export const printOrder = (order : printOrderData)=>{

    console.log("print Order function called")
   
    // check if there order id which means if the order saved or not 

    if(!order.orderId){

        alert("order not saved")

        return
    }

    console.log(order)
}