import styles from "../components/styles/OrderConfirmationModal.module.css"
import BkMnImg from "../assets/images/bkmn.png"

interface OrderConfirmationModalProps {
    isOpen: boolean,
    isLoading: boolean,
    orderNo: string,
    isClose: () => void
}


function OrderConfirmationModal({ isOpen, isClose, isLoading, orderNo }: OrderConfirmationModalProps) {

    if (!isOpen) return null;


    return (
        <>


            <div className={styles.overlay}>

                <div className={styles.modal}>

                    <div className={styles.modalHeading}>

                        {isLoading ? (
                            <h1>Your Order is Bieng Processed <br /> Please Wait </h1>

                        ) : (<h1>Your Order Successfully saved </h1>)}


                        <img src={BkMnImg} alt="" />


                    </div>


                    {isLoading ? (
                        <div className={styles.spinner}></div>
                    ) : (
                            <>
                                <div className={styles.orderNoDiv}>
                                    <h2>Order No :- {orderNo}</h2>
                                </div>

                                <button onClick={isClose} className={styles.ClsBtn}>Close</button>
                            </>
                        )}





                </div>





            </div>

        </>
    )


}
export default OrderConfirmationModal

