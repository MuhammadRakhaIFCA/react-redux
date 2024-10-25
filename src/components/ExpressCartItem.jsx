import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { Button } from "./ui/button"
import { IoCheckmark, IoClose } from "react-icons/io5"
import { useSelector } from "react-redux"
import { axiosExpress, axiosInstance } from "@/lib/axios"
import { fetchCart } from "@/services/cartService"
import { useEffect } from "react"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import axios from "axios"

export const ExpressCartItem = (props) => {
    const [quantity, setQuantity] = useState(props.quantity)

    const userSelector = useSelector((state) => state.user)
    const debouncedUpdateCart = useDebouncedCallback(() => {
        updateCartQuantity(quantity)
    }, 1000)

    const removeItem = async () => {
        try {
            await axiosExpress.delete("/carts/delete", {
                data: {
                    userId: userSelector.id,
                    productId: props.productId
                }
            })
            props.onCartUpdate() // Notify the parent to fetch the cart again
            alert('Item deleted')
        } catch (error) {
            console.log(error)
        }
    }

    const updateCartQuantity = async (_quantity) => {
        setQuantity(_quantity)
        try {
            await axiosExpress.post("/carts/update", {
                userId: userSelector.id,
                productId: props.productId,
                quantity: _quantity
            })
        } catch (error) {
            console.log(error)
        }
        props.onCartUpdate()
    }



    useEffect(() => {
        debouncedUpdateCart()
    }, [quantity])

    return (
        <div className="flex gap-4">
            <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
                <img src={props.imgUrl} alt="" className="w-full" />
            </div>

            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col">
                    <p>{props.name || ""}</p>
                    <p className="font-bold">Rp {props.price ? props.price.toLocaleString("id-ID") : 0}</p>
                </div>

                <div className="flex item-center gap-3">
                    <Button variant="ghost" size="icon"
                        onClick={() => updateCartQuantity(quantity - 1)}
                        disabled={props.quantity <= 1}
                    >
                        <IoIosRemove className="w-4 h-4" />
                    </Button>
                    <p className="text-lg font-bold">{quantity || 0}</p>
                    <Button variant="ghost" size="icon"
                        onClick={() => updateCartQuantity(quantity + 1)}
                        disabled={props.quantity >= props.stock}
                    >
                        <IoIosAdd className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex justify-between w-full">
                    <div className="flex gap-2 items-center">
                        {
                            props.stock < props.quantity ?
                                <>
                                    <IoClose className="text-red-500 w-6 h-6" />
                                    <span className="text-sm text-muted-foreground">Not Available</span>
                                </> :
                                <>
                                    <IoCheckmark className="text-green-500 w-6 h-6" />
                                    <span className="text-sm text-muted-foreground">Available</span>
                                </>
                        }
                    </div>
                    <Button variant="link" className="text-destructive" onClick={removeItem}>Remove Item</Button>
                </div>
            </div>
        </div>
    )
}
