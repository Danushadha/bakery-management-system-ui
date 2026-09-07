
import styles from "../components/styles/CreateIteComp.module.css"
import type { ItemData } from "../utils/type"
import { useState } from "react"
import { saveItem } from "../api/itemApi"
import ItemImg from "../assets/images/itemcrtImg.jpeg"

function CreateIteComp() {
    const [itemdata, setItemdata] = useState<ItemData>({
        id: 0,
        itemName: "",
        price: 0,
        qty: 0

    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setItemdata((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const saveItemdtls = async () => {

        try {


            const response = await saveItem(itemdata)
            console.log(response.data)



            setItemdata({
                id: 0,
                itemName: "",
                price: 0,
                qty: 0
            })

        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className={styles.mainContent}>


                <div className={styles.formContent}>
                    <div className={styles.imgside}>
                        <img src={ItemImg} alt="" />
                    </div>

                    <div className={styles.formSide}>
                        <h1>Create Item</h1>
                        <div className={styles.formRow}>
                            <label>Item Name :-</label>
                            <input type="text" name="itemName" value={itemdata.itemName} onChange={handleChange} autoComplete="off" />

                        </div>


                        <div className={styles.formRow}>
                            <label>Price :- </label>

                            <input type="text" name="price" value={itemdata.price} onChange={handleChange} autoComplete="off" />

                        </div>
                        <div className={styles.btnPannel}>
                            <button onClick={saveItemdtls}>Save Item</button>

                        </div>

                    </div>






                </div>




            </div>

        </>
    )

}
export default CreateIteComp