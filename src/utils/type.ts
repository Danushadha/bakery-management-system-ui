export interface UserData{
    id:number;
    userName:string;
    password:string;
}

export interface LoginData  {
    userName: string;
    password: string;
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

export interface OrderedItemsResponseDto {
    itemId: number;
    orderId: number;
    itemName: string;
    unitPrice: number;
    lineTotal: number;
    qty: number;
    shift: string;
}

export interface OrderResponseDto{
    id:number;
    orderNo:string;
    orderDate:string;
    totalAmount:number;
    vehicle:VehicleDtls;
    status:string;
   
    morningTotal:number;
    eveningTotal:number;
    grandtotal:number;

    morningItemsResponseDto: OrderedItemsResponseDto[];
    eveningItemsResponseDto: OrderedItemsResponseDto[];
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
