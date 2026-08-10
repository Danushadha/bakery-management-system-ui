import { forwardRef } from "react"
import type { ItemData, VehicleDtls } from "../utils/type"
import styles from "../components/styles/PrintOrder.module.css"
import logo from "../assets/images/NBLogo.png"

type PrintOrderData = {

    orderId: number | null
    orderNo: string
    orderStatus: string
    orderDate: string
    vehicle: VehicleDtls | null
    morningItems: ItemData[]
    eveningItems: ItemData[]
    morningTotal: number | null
    eveningTotal: number | null
    grandTotal: number | null
}

type PrintOrderProps = {
    printOrder: PrintOrderData
}

const PrintOrder = forwardRef<HTMLDivElement, PrintOrderProps>(({ printOrder }, ref) => {

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
    const getShiftDisplay = () => {

        const hasMorning = printOrder.morningItems.some(item => Number(item.qty) > 0)
        const hasEvening = printOrder.eveningItems.some(item => Number(item.qty) > 0)

        let shift = "No shift selected"


        if (hasMorning) {
            shift = "Morning"
        }

        if (hasEvening) {
            shift = "Evening"
        }

        if (hasMorning && hasEvening) {

            shift = "Morning & Evening"
        }

        return shift
    }


    return (
        <>
            <div ref={ref} className={styles.mainDiv}>

                <div className={styles.logoDiv}>

                    <img src={logo} alt="" />

                </div>
                <div className={styles.heading}>

                    <h2>Nethu Bake House</h2>
                    <p> #148 Aththidiya Road, Dehiwala-Mount Lavinia <br /> Contact :- 077 759 3669</p>

                </div>
                <div className={styles.orderDtlsHeading}>
                    <h3>{printOrder.orderNo}</h3>
                    <p>{formatDateTime(printOrder?.orderDate)}</p>

                    <div className={styles.orderContDtlsHeading}>

                        <div className={styles.orderContDtlsHeadingleft}>
                            <p> <strong>Vehicle No:- </strong> {printOrder ?.vehicle ?.vehicleNumber}</p>
                            <p> <strong>Driver Name:- </strong> {printOrder ?.vehicle ?.driverName}</p>
                        </div>

                        <div className={styles.orderContDtlsHeadingRight}>
                            <p> <strong>Order Status:- </strong> {printOrder.orderStatus}</p>
                            <p> <strong>Shift:- </strong> {getShiftDisplay()}</p>

                        </div>
                    </div>


                </div>

                <div className={styles.itemDiv}>

                    <p><strong><em>Morning Items</em></strong></p>

                    <table className={styles.itemTable}>

                        <thead>
                            <th>Item Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </thead>

                        <tbody>
                            {
                                order.morningItems.map(item => (
                                    <tr key={item.id}>

                                        <td>{item.itemName}</td>
                                        <td>{Number(item.price).toFixed(2)}</td>
                                        <td>{item.qty}</td>


                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>

                </div>




            </div>

        </>


    )


})
export default PrintOrder