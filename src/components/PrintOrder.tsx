import { forwardRef } from "react"
import type { PrintOrderData } from "../utils/type"
import styles from "../components/styles/PrintOrder.module.css"
import logo from "../assets/images/NBLogo.png"


type PrintOrderProps = {
    printOrder: PrintOrderData | null
}

const PrintOrder = forwardRef<HTMLDivElement, PrintOrderProps>(({ printOrder }, ref) => {

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

                <div className={styles.logoDiv}>

                    <img src={logo} alt="" />

                </div>
                
                <div className={styles.heading}>

                    <h2>Nethu Bake House</h2>
                    <p> #152/1 Main Road, Attidiya Dehiwala <br /> Contact :- 076 825 4434</p>

                </div>
                <div className={styles.orderDtlsHeading}>
                    <h3>{printOrder.orderNo}</h3>
                    <p>{formatDateTime(printOrder.orderDate)}</p>

                    <div className={styles.orderContDtlsHeading}>

                        <div className={styles.orderContDtlsHeadingleft}>
                            <p> <strong>Vehicle No:- </strong> {printOrder.vehicle.vehicleNumber}</p>
                            <p> <strong>Driver Name:- </strong> {printOrder.vehicle.driverName}</p>
                        </div>

                        <div className={styles.orderContDtlsHeadingRight}>
                            <p> <strong>Order Status:- </strong> {printOrder.status}</p>
                            <p> <strong>Shift:- </strong> {getShiftDisplay()}</p>

                        </div>
                    </div>


                </div>

                <div className={styles.itemDiv}>

                    {hasMorning && (
                        <p><strong><em>Morning Items</em></strong></p>

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

                <div className={styles.moriningToaldiv}>

                    {hasMorning && (
                        <>
                            <p><strong>Morning Total</strong> </p>

                            {Number(printOrder.morningTotal).toFixed(2)}
                        </>

                    )}


                </div>


                {/* Evening table */}


                {hasEvening && (

                    <>
                        <div className={styles.itemDiv}>


                            <p><strong><em>Evening Items</em></strong></p>




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






                        </div>
                    </>
                )}

                <div className={styles.eveningToaldiv}>

                    {hasEvening && (
                        <>
                            <p><strong>Evening Total</strong> </p>

                            {Number(printOrder.eveningTotal).toFixed(2)}


                        </>

                    )}



                </div>
                <div className={styles.grdtotalDiv}>

                    <p><strong>Grand Total</strong> </p>

                    {Number(printOrder.grandtotal).toFixed(2)}

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
export default PrintOrder