
import styles from "../components/styles/CreateIteComp.module.css"
import type { ItemData } from "../utils/type"
import { useState } from "react"
import { saveItem } from "../api/itemApi"
import { getAllItems } from "../api/itemApi"
import { updateItem } from "../api/itemApi"
import { disableItem } from "../api/itemApi"
import ItemImg from "../assets/images/itemcrtImg.jpeg"


function CreateIteComp() {
    const [itemdata, setItemdata] = useState<ItemData>({
        id: 0,
        itemName: "",
        price: 0,
        qty: 0

    })

    const [changeName, setChangeName] = useState("Save Item")
    const [loadItemsData, setloadItemsData] = useState<ItemData[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setItemdata((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const crudhandle = async () => {

        //this prevents user type without selecting a item
        if (itemdata.id < 1) {
            alert("You've not select a Item")
            return
        }
        try {

            if (changeName === "Save Item") {



                const response = await saveItem(itemdata)

                console.log(response.data)

            }
            if (changeName === "Update Item") {


                const response = await updateItem(itemdata)

                console.log(response.data)

            }

            if (changeName === "Disable Item") {

                const response = await disableItem(itemdata)

                console.log(response.data)

            }

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



    const loadData = async () => {

        try {
            const response = await getAllItems()
            console.log("loading Items", response.data)

            setloadItemsData(response.data)

        }
        catch (error) {
            console.log(error)

        }


    }


    const handleEdit = async () => {

        await loadData()
        setChangeName("Update Item")

    }

    const handleDelete = async () => {
        await loadData()
        setChangeName("Disable Item")

    }

    const closeItempnl = () => {
        setChangeName("Save Item")
        setItemdata({
            id: 0,
            itemName: "",
            price: 0,
            qty: 0
        })

    }

    return (
        <>
            <div className={styles.mainContent}>


                <div className={styles.formContent}>
                    <div className={styles.imgside}>
                        {(changeName === "Update Item" || changeName === "Disable Item") && (

                            <div className={styles.viewItemsPnl}>
                                <div className={styles.itmpnlheader}>
                                    <h3>Select Item</h3>
                                    <button onClick={closeItempnl}>X</button>
                                </div>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Item Name</th>
                                            <th>Item Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loadItemsData.map((item, index) => (
                                                <tr key={item.id}>

                                                    <td>{index + 1}</td>
                                                    <td><button className={styles.itmBtn} onClick={() => setItemdata(item)}>{item.itemName}</button></td>
                                                    <td><button className={styles.itmBtn} onClick={() => setItemdata(item)}>Rs. {Number(item.price).toFixed(2)}</button></td>

                                                </tr>

                                            ))
                                        }

                                    </tbody>
                                </table>


                            </div>

                        )}


                        <img src={ItemImg} alt="" />

                    </div>

                    <div className={styles.formSide}>
                        <h1>{changeName}</h1>
                        <div className={styles.crudBtn}>

                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Disable </button>

                        </div>
                        <div className={styles.formRow}>
                            <label>Item Name :-</label>
                            <input type="text" name="itemName" value={itemdata.itemName} 
                            onChange={handleChange} 
                            autoComplete="off"
                            disabled={changeName === "Disable Item"}
                            />

                        </div>


                        <div className={styles.formRow}>
                            <label>Price :- </label>

                            <input type="text" name="price"
                             value={itemdata.price} 
                             onChange={handleChange}
                              autoComplete="off"
                              disabled={changeName === "Disable Item"} />

                        </div>
                        <div className={styles.btnPannel}>
                            <button onClick={crudhandle}>{changeName}</button>

                        </div>

                    </div>






                </div>




            </div>

        </>
    )

}
export default CreateIteComp