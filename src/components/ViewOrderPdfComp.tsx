import { forwardRef } from "react"
import type { PrintOrderData } from "../utils/type"
import styles from "../components/styles/ViewOrderPdfComp.module.css"
import logo from "../assets/images/NBLogo.png"


type PrintOrderProps = {
    printOrder: PrintOrderData | null
}

const ViewOrderPdfComp = forwardRef<HTMLDivElement, PrintOrderProps>(({ printOrder }, ref) => {



    if (!printOrder) {

        return <div ref={ref} className={styles.mainDiv}></div>


    }

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

    const hasMorning = printOrder.morningItemsResponseDto.some(item => Number(item.qty) > 0)
    const hasEvening = printOrder.eveningItemsResponseDto.some(item => Number(item.qty) > 0)

    const getShiftDisplay = () => {


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

                <div className={styles.heading}>
                    <div className={styles.headingtext}>

                        <h1>Nethu Bake House</h1>
                        <small> #152/1 Main Road, Attidiya Dehiwala <br /> Contact :- 076 825 4434</small>

                    </div>

                    <div className={styles.logoDiv}>

                        <img src={logo} alt="" />

                    </div>



                </div>



                <div className={styles.orderContDtlsHeading}>

                    <div className={styles.orderContDtlsHeadingleft}>

                        <p><strong>Order No :- </strong>{printOrder.orderNo}</p>
                        <p> <strong>Driver Name :- </strong> {printOrder.vehicle.driverName}</p>
                        <p> <strong>Vehicle No :- </strong> {printOrder.vehicle.vehicleNumber}</p>

                    </div>

                    <div className={styles.orderContDtlsHeadingRight}>
                        <p><strong>Date :- </strong>{formatDateTime(printOrder.orderDate)}</p>
                        <p> <strong>Shift :- </strong> {getShiftDisplay()}</p>

                    </div>
                </div>

                <div className={styles.itemDiv}>

                    <div className={styles.morningItemsTable}>
                        {hasMorning && (
                            <p><strong>Morning Items</strong></p>

                        )}



                        <table className={styles.itemTable}>

                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Unit Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>

                                </tr>

                            </thead>

                            <tbody>
                                {hasMorning && (
                                    printOrder.morningItemsResponseDto.map(item => (
                                        <tr key={item.itemId}>

                                            <td>{item.itemName}</td>
                                            <td>{Number(item.unitPrice).toFixed(2)}</td>
                                            <td>{item.qty}</td>
                                            <td>{Number(item.lineTotal).toFixed(2)}</td>


                                        </tr>
                                    ))
                                )

                                }
                            </tbody>

                        </table>

                    </div>


                    <div className={styles.eveningItemsTable}>

                        {hasEvening && (

                            <>
                                <p><strong>Evening Items</strong></p>




                                <table className={styles.itemTable}>

                                    <thead>
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Unit Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>

                                        </tr>

                                    </thead>

                                    <tbody>
                                        {hasEvening && (
                                            printOrder.eveningItemsResponseDto.map(item => (
                                                <tr key={item.itemId}>

                                                    <td>{item.itemName}</td>
                                                    <td>{Number(item.unitPrice).toFixed(2)}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{Number(item.lineTotal).toFixed(2)}</td>


                                                </tr>
                                            ))
                                        )

                                        }
                                    </tbody>

                                </table>





                            </>
                        )}


                    </div>



                </div>
                <div className={styles.totalDivs}>
                    <p><strong> Morning Total :- </strong>Rs. {Number(printOrder.morningTotal).toFixed(2)}</p>
                    <p><strong> Evening Total :- </strong>Rs. {Number(printOrder.eveningTotal).toFixed(2)}</p>
                    <p><strong> Grand Total :- </strong>Rs. {Number(printOrder.grandtotal).toFixed(2)}</p>
                    
                </div>


                <div className={styles.signatureDiv}>

                    <div className={styles.signatureBox}>


                        <p>Prepared By</p>
                    </div>
                    <div className={styles.signatureBox}>

                        <p>Approved By</p>
                    </div>
                </div>



            </div>


        </>


    )


})
export default ViewOrderPdfComp