export interface DriverData{
    id:number;
    name:string;
    nic:string;
    contactNo:string;
}
export interface ItemData{
    id:number;
    itemName:string;
    price:number;
    qty:number | "";
}


export interface VehicleDtls{
    id:number;
    vehicleNumber:string;
    driverName:string;
    driverId:number;
}

export interface orderedItemRequestDto{
    itemId:number;
    qty:number;
}

export interface orderedRequestDTO{

    orderId:number | null;
    vehicleId:number;
    orderedItemsRequestDtoList:orderedItemRequestDto[];
}

export interface OrderedItemsResponseDto{
    itemId: number;
    itemName:string;
    lineTotal:number;
    qty:number;
    unitPrice:number;
}

export interface OrderResponseDto{
    id:number;
    orderNo:string;
    orderDate:string;
    totalAmount:number;
    driver:DriverData;
    vehicle:VehicleDtls;
    orderedItemsResponseDto: OrderedItemsResponseDto[]
}