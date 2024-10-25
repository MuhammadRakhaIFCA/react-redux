import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { Button } from "./ui/button"
import { IoCheckmark, IoClose } from "react-icons/io5"
import { useSelector } from "react-redux"
import { axiosInstance } from "@/lib/axios"
import { fetchCart } from "@/services/cartService"
import { useEffect } from "react"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const CartItem = (props) => {
    const userSelector = useSelector((state) => state.user)
    const [quantity, setQuantity] = useState(props.quantity)
    const debouncedUpdateCart = useDebouncedCallback(() => {
        updateCartQuantity()
    }, 1000)

    const removeItem = async () => {
        try {
            await axiosInstance.delete("/carts/" + props.cartId)
            fetchCart(userSelector.id)
            alert('item deleted')
        } catch (error) {
            console.log(error)
        }
    }
    const updateCartQuantity = async () => {
        try {
            await axiosInstance.patch("/carts/" + props.cartId, {
                quantity: quantity
            })
            fetchCart(userSelector.id)
        } catch (error) {
            console.log(error)
        }
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
                    <p>{props.name}</p>
                    <p className="font-bold">Rp {props.price.toLocaleString("id-ID")}</p>
                </div>

                <div className="flex item-center gap-3">
                    <Button variant="ghost" size="icon"
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                    >
                        <IoIosRemove className="w-4 h-4" />
                    </Button>
                    <p className="text-lg font-bold">{quantity}</p>
                    <Button variant="ghost" size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity >= props.stock}
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