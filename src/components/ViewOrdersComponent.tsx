import styles from "../components/styles/ViewOrdersComponent.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import { getOrderByDate } from "../api/orderApi"
import type { OrderResponseDto } from "../utils/type"

function ViewOrdersComponent() {

    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndtDate] = useState<Date | null>(null)
    const [searchedOrder, setSearchedOrder] = useState<OrderResponseDto[]>([])
    const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(null)

    const searchOrders = async () => {

        if (!startDate || !endDate) {
            alert("Please select start date and end date")
            return
        }

        try {

            const formatDate = (date: Date) => {

                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, "0")
                const day = String(date.getDate()).padStart(2, "0")

                return `${year}-${month}-${day}`
            }

            const start = formatDate(startDate)
            const end = formatDate(endDate)

            console.log("Start date:", start)
            console.log("End date:", end)

            const response = await getOrderByDate(
                start,
                end
            )

            console.log(response.data)

            setSearchedOrder(response.data)

        } catch (error) {

            console.error("Error getting orders:", error)

        }
    }

    return (
        <>

            <div className={styles.mainDiv}>


                <div className={styles.orderSelectDiv}>

                    <div className={styles.searchDate}>

                        <DatePicker

                            className={styles.datePicker}
                            calendarClassName={styles.calendar}
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(dates) => {

                                const [start, end] = dates
                                setStartDate(start)
                                setEndtDate(end)
                            }}

                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select Date Range"


                        />
                        <button className={styles.searchBtn} onClick={searchOrders}>Search</button>

                    </div>


                    {searchedOrder.length != 0 && (

                        <>
                            <div>
                                <h3>Select your Order </h3>
                            </div>

                            <div className={styles.selectedorders}>
                                {searchedOrder.map((order => (

                                    <button className={styles.vehicleBtn} key={order.id}
                                        onClick={() => setSelectedOrder(order)}>
                                        {order.vehicle.vehicleNumber}-{order.vehicle.driverName}
                                    </button>
                                )))}



                            </div>
                        </>
                    )
                    }



                </div>
                <div className={styles.orderDetailDiv}>

                    {selectedOrder && (
                        <>

                            <div className={styles.orderdeatlshearder}>
                                <div className={styles.orderInfo}>
                                    <p>Order No :- {selectedOrder.orderNo}</p>
                                    <p>Vehicle :- {selectedOrder.vehicle.vehicleNumber}</p>
                                    <p>Driver :- {selectedOrder.vehicle.driverName}</p>
                                    <p>Date :- {selectedOrder.orderDate.split("T")[0]}</p>

                                </div>

                                <div className={styles.orderTotals}>

                                    <p>Morning Total :-  Rs.{Number(selectedOrder.morningTotal).toFixed(2)}</p>
                                    <p>Evening Total :-  Rs. {Number(selectedOrder.eveningTotal).toFixed(2)}</p>
                                    <p>Grand Total :-  Rs {Number(selectedOrder.grandtotal).toFixed(2)}</p>

                                </div>
                            </div>
                            <div className={styles.itemsDiv}>

                                <div className={styles.morningDiv}>
                                    <h4>Morning Items</h4>
                                    {selectedOrder.morningItemsResponseDto && (
                                        <table className={styles.itemTable}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item Name</th>
                                                    <th>Unit Price</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedOrder.morningItemsResponseDto.map((item, index) => (



                                                    <tr key={item.itemId}>
                                                        <td>{index+1}</td>
                                                        <td>{item.itemName}</td>
                                                        <td> @ Rs. {Number(item.unitPrice).toFixed(2)}</td>

                                                        <td>{item.qty}</td>
                                                        <td>{Number(item.lineTotal).toFixed(2)}</td>
                                                    </tr>


                                                ))}
                                            </tbody>
                                        </table>

                                    )}

                                </div>
                                <div className={styles.eveningDiv}>
                                    <h4>Evening Items</h4>

                                    {selectedOrder.eveningItemsResponseDto && (
                                        <table className={styles.itemTable}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item Name</th>
                                                    <th>Unit Price</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {selectedOrder.eveningItemsResponseDto.map((item ,index) => (


                                                
                                                    <tr key={item.itemId}>
                                                        <td>{index+1}</td>
                                                        <td>{item.itemName}</td>
                                                        <td> @ Rs. {Number(item.unitPrice).toFixed(2)}</td>

                                                        <td>{item.qty}</td>
                                                        <td>{Number(item.lineTotal).toFixed(2)}</td>
                                                    </tr>
                                                

                                            ))}

                                            </tbody>
                                        </table>

                                    )}

                                </div>

                            </div>
                        </>
                    )}

                </div>

            </div>
        </>
    )

}
export default ViewOrdersComponent