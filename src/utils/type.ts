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
    vehicle:VehicleDtls;
    orderStatus:string;
    orderedItemsResponseDto: OrderedItemsResponseDto[];
    morningTotal:number;
    eveningTotal:number;
    grandTotal:number;
}

export interface PrintOrderData{
    id:number;
    orderNo:string;
    orderDate:string;
    vehicle:VehicleDtls;
    status:string;
    morningTotal:number;
    eveningTotal:number;
    grandtotal:number;
    morningItemsResponseDto:OrderedItemsResponseDto[];
    eveningItemsResponseDto:OrderedItemsResponseDto[];
}
