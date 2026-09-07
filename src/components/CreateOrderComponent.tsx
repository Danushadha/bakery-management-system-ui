import styles from "./styles/CreateOrderComponent.module.css"
import { useState, useEffect, useRef} from "react"
import {useReactToPrint} from "react-to-print"
import type { ItemData, VehicleDtls , PrintOrderData } from "../utils/type"
import { getAllItems } from "../api/itemApi"
import { getAllVcl } from "../api/vhclApi"
import { saveMorningOrder } from "../api/orderApi"
import { saveEveningOrder } from "../api/orderApi"
import { getTodayOrder } from "../api/orderApi"
import { getCloseAndInvoiceDtls } from "../api/orderApi"
import PrintOrder from "../components/PrintOrder"




function CreateOrderComponent() {


    const [showDrpDwn, setShowDrpDwn] = useState(false)
    const [vehicle, setVehicle] = useState<VehicleDtls[]>([])
    const [isMorningSaved, setIsMorningSaved] = useState(false);
    const [isEveningSaved, setIsEveningSaved] = useState(false);

    const [printOrder, setPrintOrder] = useState<PrintOrderData | null>(null)

    const printRef = useRef<HTMLDivElement>(null)

    const [order, setOrder] = useState({
        orderId: null as number | null,
        orderNo: "",
        orderStatus: "",
        orderDate: "",
        vehicle: null as VehicleDtls | null,
        morningItems: [] as ItemData[],
        eveningItems: [] as ItemData[],
        morningTotal:null as number | null,
        eveningTotal:null as number | null,
        grandTotal:null as number | null

    })

    const formatDateTime = (dateTime: string) => {
        if (!dateTime) return "";

        return new Date(dateTime).toLocaleString("en-LK", {

            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
            
        });
    };


    useEffect(() => {

        const loadBckEndData = async () => {

            try {

                const itemData = await getAllItems()


                const morningItems = itemData.data.map((item: ItemData) => ({
                    ...item,
                    qty: 0
                }))

                const eveningItems = itemData.data.map((item: ItemData) => ({
                    ...item,
                    qty: 0
                }))

                setOrder(prev => ({
                    ...prev,
                    morningItems: morningItems,
                    eveningItems: eveningItems
                }))


                const vehicleData = await getAllVcl()
                setVehicle(vehicleData.data)



            }
            catch (error) {
                console.error("cannotFetch data", error)

            }

        }


        loadBckEndData()
    }, [])


    const toggleDrpDwn = () => {

        setShowDrpDwn(prev => (!prev))

    }
    const handleSelectVehicle = async (vehicle: VehicleDtls) => {

        setIsMorningSaved(false)
        setIsEveningSaved(false)

        setOrder(prev => ({
            ...prev,
            vehicle: vehicle
        }))


        try {

            const response = await getTodayOrder(vehicle.id)
            console.log("Today Order Response");
            console.log(response.data);


            if (response.data) {
                loadOrder(response.data)
            }

            else {

                clearOrder(vehicle)
            }


        }
        catch (error) {

            console.error("cannot find Vehicle", error)

        }


        setShowDrpDwn(false)

    }

    const loadOrder = (savedOrder: any) => {


        //here map sets key value pairs
        //key will be itemId and value will be qty
        const MqtyMap = new Map<number, number>(

            savedOrder.morningItemsResponseDto.map((item: any) => [

                item.itemId,
                item.qty
            ])

        )

        const EqtyMap = new Map<number, number>(

            savedOrder.eveningItemsResponseDto.map((item: any) => [

                item.itemId,
                item.qty
            ])

        )

        setOrder(prev => ({
            ...prev,

            orderId: savedOrder.id,
            orderNo: savedOrder.orderNo,
            vehicle: savedOrder.vehicle,
            orderStatus: savedOrder.status,
            orderDate: savedOrder.orderDate,

            morningItems: prev.morningItems.map(item => ({
                ...item,
                qty: MqtyMap.get(item.id) ?? 0
            })),

            eveningItems: prev.eveningItems.map(item => ({
                ...item,
                qty: EqtyMap.get(item.id) ?? 0
            }))
        }))

        setPrintOrder(savedOrder)

    }

    const clearOrder = (vehicle: VehicleDtls) => {

        setOrder(prev => ({
            ...prev,

            orderId: null,
            orderNo: "",
            vehicle,
            orderStatus: "",
            orderDate: "",
            morningItems: prev.morningItems.map(item => ({
                ...item,
                qty: 0
            })),

            eveningItems: prev.eveningItems.map(item => ({
                ...item,
                qty: 0
            })),
        }))

    }


    type Shift = "morning" | "evening";

    const handleQtyChange = (id: number, value: string, shift: Shift) => {

        setOrder(prev => {

            const items = shift === "morning" ? prev.morningItems : prev.eveningItems

            const updatedItems = items.map(item =>
                item.id === id ?
                    {
                        ...item,
                        qty: value === "" ? ("" as "") : Number(value)

                    } : item

            )





            return {
                ...prev,
                morningItems: shift === "morning" ? updatedItems : prev.morningItems,
                eveningItems: shift === "evening" ? updatedItems : prev.eveningItems

            }

        })

    }

    const increaseQty = (id: number, shift: Shift) => {


        setOrder(prev => {

            const items = shift === "morning" ? prev.morningItems : prev.eveningItems

            const updatedItems = items.map(item =>

                item.id === id ? {
                    ...item,
                    qty: Number(item.qty || 0) + 1
                } : item

            )


            return {

                ...prev,
                morningItems:
                    shift === "morning" ? updatedItems : prev.morningItems,

                eveningItems:
                    shift === "evening"
                        ? updatedItems
                        : prev.eveningItems
            }
        })
    }

    const decreaseQty = (
        id: number,
        shift: Shift
    ) => {

        setOrder(prev => {

            const items =
                shift === "morning"
                    ? prev.morningItems
                    : prev.eveningItems;

            const updatedItems = items.map(item =>

                item.id === id
                    ? {
                        ...item,
                        qty: Math.max(
                            0,
                            Number(item.qty || 0) - 1
                        )
                    }
                    : item

            );

            return {

                ...prev,

                morningItems:
                    shift === "morning"
                        ? updatedItems
                        : prev.morningItems,

                eveningItems:
                    shift === "evening"
                        ? updatedItems
                        : prev.eveningItems

            };

        });

    }

    const morningTotal = order.morningItems.reduce((total, item) => {
        return total + (Number(item.price) * Number(item.qty || 0));
    }, 0);

    const eveningTotal = order.eveningItems.reduce((total, item) => {
        return total + (Number(item.price) * Number(item.qty || 0));
    }, 0);

    const grandTotal = morningTotal + eveningTotal;





    const saveorderMorning = async () => {

        if (!order.vehicle) {
            alert("Please select a vehicle...");
            return;
        }

        const hasMorning = order.morningItems.some(item=> Number(item.qty)>0)
        
        if(!hasMorning){
            alert("You have not update the Morning Qty...");
            return;
        }

        


        const morningPayload = {

            orderId: order.orderId,
            vehicleId: order.vehicle!.id,
            orderedItemsRequestDtoList: order.morningItems
                .filter(item => Number(item.qty) > 0)
                .map(item => ({
                    itemId: item.id,
                    qty: Number(item.qty)
                }))

        }

        try {
            const response = await saveMorningOrder(morningPayload)
            console.log("morning response", response.data)

            const saveOrder = response.data

            setOrder(prev => ({
                ...prev,
                orderId: saveOrder.id,
                orderNo: saveOrder.orderNo,
                vehicle: saveOrder.vehicle,
                orderStatus: saveOrder.status,
                orderDate: saveOrder.orderDate,
                morningTotal:saveOrder.morningTotal,
                grandTotal:saveOrder.grandtotal,

                morningItems: prev.morningItems.map(item => {

                    const savedItem = saveOrder.morningItemsResponseDto.find(
                        (i: any) => i.itemId === item.id)

                    return {
                        ...item,
                        qty: savedItem ? savedItem.qty : 0
                    }

                })





            }))

            if(saveOrder){
                alert("You have successfully saved the morning order");

            }

            

            setIsMorningSaved(true)

        }

        catch (error) {
            console.log(error)
        }


    }

    const saveOrderEvening = async () => {

        if (!order.vehicle) {
            alert("Please select a vehicle.");
            return;
        }

        const hasEvening = order.eveningItems.some(item=> Number(item.qty)>0)
        
        if(!hasEvening){
            alert("You have not update the  Evenng Qty...");
            return;
        }
        const eveningPayload = {

            orderId: order.orderId,
            vehicleId: order.vehicle!.id,
            orderedItemsRequestDtoList: order.eveningItems
                .filter(item => Number(item.qty) > 0)
                .map(item => ({
                    itemId: item.id,
                    qty: Number(item.qty)
                }))

        }

        try {

            const response = await saveEveningOrder(eveningPayload)
            console.log("evening response", response.data)
            const savedOrder = response.data

            setOrder(prev => ({
                ...prev,
                orderId: savedOrder.id,
                orderNo: savedOrder.orderNo,
                vehicle: savedOrder.vehicle,
                orderStatus: savedOrder.status,

                eveningItems: prev.eveningItems.map(item => {

                    const savedItem = savedOrder.eveningItemsResponseDto.find(
                        (i: any) => i.itemId === item.id)

                    return {
                        ...item,
                        qty: savedItem ? savedItem.qty : 0
                    }

                })

            }))

            if(savedOrder){
                
                alert("You have successfully saved the Evenng Order ...");
                
            }

            setIsEveningSaved(true)

        }

        catch (error) {
            console.log(error)
        }
    }
    const getShiftDisplay = () => {

        const hasMorning = order.morningItems.some(item => Number(item.qty) > 0)
        const hasEvening = order.eveningItems.some(item => Number(item.qty) > 0)

        let shift = "No shift selected"


        if (hasMorning) {
            shift = "Morning"
        }

        if (hasEvening) {
            shift = "Evening"
        }

        if (hasMorning && hasEvening) {

            shift = "Morning & Evening Both"
        }

        return shift


    }

    const totalItems =
        order.morningItems.reduce(
            (total, item) => total + Number(item.qty || 0),
            0
        ) +
        order.eveningItems.reduce(
            (total, item) => total + Number(item.qty || 0),
            0
        );

        

    const closeOrder = async () => {


        if (!order.orderId) {
            alert("You have not saved the order");
            return
        }

        try {

            const response = await getCloseAndInvoiceDtls(order.orderId)
            console.log(response.data)

            const closedOrder = response.data

            setOrder(prev=>({
                ...prev,
                orderStatus:closedOrder.status

            } ))

            setPrintOrder(closedOrder)

            
        }
        catch (error) {
            console.log(error)

        }

        setIsEveningSaved(true)
        setIsMorningSaved(true)


    }

    const handlePrint = useReactToPrint({

        contentRef:printRef,
        documentTitle: "Invoice"
    })




    return (
        <>

          <PrintOrder ref={printRef} printOrder={printOrder}/>

        


            <div className={styles.mainDiv}>
                <div className={styles.orderSummaryDiv}>

                    <h3>Order Details</h3>

                    <p>Select Vehicle</p>
                    <button className={styles.vSlBtn} onClick={toggleDrpDwn}>
                        {order.vehicle
                            ? `${order.vehicle.vehicleNumber} - ${order.vehicle.driverName}`
                            : "Select Vehicle"}



                    </button>

                    <div
                        className={`${styles.vSlBtnDrpDwnBtn} ${
                            showDrpDwn ? styles.show : styles.hide
                            }`}>

                        {vehicle.map(selectedVehicle => (
                            <div key={selectedVehicle.id}>
                                <button className={styles.drpDwnBtn} onClick={() => handleSelectVehicle(selectedVehicle)}>
                                    {selectedVehicle.vehicleNumber} - {selectedVehicle.driverName} </button>

                            </div>
                        ))}


                    </div>



                    <h3>Order Summary</h3>

                    <div className={styles.orderSummarydtls}>
                        <div className={styles.ordSumleft}>
                            <p>Vehicle No</p>
                            <p>Order No</p>
                            <p>Order Date </p>
                            <p>Total Items</p>
                            <p>Shift </p>
                            <p>Order Status</p>


                        </div>
                        <div className={styles.ordSumRight}>
                            <p>{order.vehicle ?.vehicleNumber}</p>
                            <p>{order ?.orderNo}</p>
                            <p>{formatDateTime(order ?.orderDate)}</p>
                            <p>{totalItems}</p>
                            <p>{getShiftDisplay()}</p>
                            <p>{order ?.orderStatus}</p>

                        </div>
                            
                    </div>


                </div>
                <div className={styles.morningShift}>
                    <h3>Morning</h3>
                    <div className={styles.ItemtableDiv}>

                        <table className={styles.itemTable}>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                </tr>


                            </thead>
                            <tbody>

                                {
                                    order.morningItems.map(item => (
                                        <tr key={item.id} className={styles.itemRow}>

                                            <td>{item.itemName}<br />
                                                <small>@Rs. {Number(item.price).toFixed(2)}</small>
                                            </td>
                                            <td>
                                                <button className={styles.QtyBtn} onClick={() => decreaseQty(item.id, "morning")} disabled={isMorningSaved || order.orderStatus === "CLOSE"} >-</button>
                                                <input type="number" className={styles.qtyInput}
                                                    value={item.qty}
                                                    onChange={(e) => handleQtyChange(item.id, e.target.value, "morning")}
                                                    disabled={isMorningSaved || order.orderStatus === "CLOSE"} />

                                                <button className={styles.QtyBtn} onClick={() => increaseQty(item.id, "morning")} disabled={isMorningSaved || order.orderStatus === "CLOSE"}>+</button>
                                            </td>
                                            <td>Rs. {(Number(item.price) * Number(item.qty)).toFixed(2)}</td>
                                        </tr>


                                    ))
                                }

                            </tbody>
                        </table>

                    </div>
                    <div className={styles.btnPnl}>
                        <button className={styles.shiftBtn} disabled={!order.orderId || order.orderStatus === "CLOSE"} onClick={() => setIsMorningSaved(false)} >Edit</button>
                        <button className={styles.shiftBtn} onClick={saveorderMorning} disabled={isMorningSaved || order.orderStatus === "CLOSE"}>Save</button>

                    </div>

                </div>
                <div className={styles.eveningShift}>
                    <h3>Evening</h3>

                    <div className={styles.ItemtableDiv}>
                        <table className={styles.itemTable}>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                </tr>


                            </thead>
                            <tbody>

                                {
                                    order.eveningItems.map(item => (
                                        <tr key={item.id} className={styles.itemRow}>

                                            <td>{item.itemName}<br />
                                                <small>@Rs. {Number(item.price).toFixed(2)}</small>
                                            </td>
                                            <td>
                                                <button className={styles.QtyBtn} onClick={() => decreaseQty(item.id, "evening")} disabled={isEveningSaved || order.orderStatus === "CLOSE"}>-</button>
                                                <input type="number" className={styles.qtyInput}
                                                    value={item.qty}
                                                    onChange={(e) => handleQtyChange(item.id, e.target.value, "evening")} disabled={isEveningSaved || order.orderStatus === "CLOSE"}
                                                />
                                                <button className={styles.QtyBtn} onClick={() => increaseQty(item.id, "evening")} disabled={isEveningSaved || order.orderStatus === "CLOSE"}>+</button>
                                            </td>
                                            <td>Rs. {(Number(item.price) * Number(item.qty)).toFixed(2)}</td>
                                        </tr>


                                    ))
                                }

                            </tbody>
                        </table>

                    </div>
                    <div className={styles.btnPnl}>

                        <button className={styles.shiftBtn} disabled={!order.orderId || order.orderStatus === "CLOSE"} onClick={() => setIsEveningSaved(false)}>Edit</button>
                        <button className={styles.shiftBtn} onClick={saveOrderEvening} disabled={isEveningSaved || order.orderStatus === "CLOSE"}>Save</button>

                    </div>

                </div>

            </div>

            <div className={styles.totalsPannel}>

                <div className={styles.indShftTtlPnl}>
                    <div className={styles.indShftTtlPnlIcn}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.shftIcn}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>


                    </div>

                    <div className={styles.indShftTtlPnlTxt}>
                        <p>Morning Shift Total</p>

                        <h1>Rs. {morningTotal.toFixed(2)}</h1>

                    </div>


                </div>
                <div className={styles.indShftTtlPnl}>
                    <div className={styles.indShftTtlPnlIcn}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.shftIcn}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>


                    </div>

                    <div className={styles.indShftTtlPnlTxt}>
                        <p>Evening Shift Total </p>
                        <h1>Rs. {eveningTotal.toFixed(2)}</h1>

                    </div>

                </div>
                <div className={styles.indShftTtlPnl}>

                    <div className={styles.indShftTtlPnlIcn}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.shftIcn}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                        </svg>

                    </div>

                    <div className={styles.indShftTtlPnlTxt}>
                        <p>Grand Total (Both Shifts) </p>
                        <h1>Rs. {grandTotal.toFixed(2)}</h1>

                    </div>


                </div>

            </div>
            <div className={styles.mainBtnPannel}>
                <button className={styles.mainBtnPannelBtn} onClick={() => closeOrder()} >Close Order</button>
                <button className={styles.mainBtnPannelBtn} onClick ={handlePrint}>Print Order</button>

            </div>
        </>
    )
} export default CreateOrderComponent