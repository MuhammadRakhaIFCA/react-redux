import { useState } from "react"
import { Button } from "./ui/button"
import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "@/lib/axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "@/services/cartService"

export const ProductCard = (props) => {
    const userSelector = useSelector((state) => state.user)
    const [quantity, setQuantity] = useState(0)
    const [stock, setStock] = useState(props.stock);
    const dispatch = useDispatch()


    useEffect(() => {
        fetchCart(userSelector.id)
    }, [])

    const addToCart = async (quantity) => {
        if (!userSelector.id) {
            alert('please login first')
            return
        }
        try {
            const cartRespose = await axiosInstance.get("/carts", {
                params: {
                    userId: userSelector.id,
                    _embed: "product"
                }
            })
            const existingProduct = cartRespose.data.find(cart => {
                return cart.productId === props.id
            })
            if (!existingProduct) {
                await axiosInstance.post("/carts", {
                    userId: userSelector.id,
                    productId: props.id,
                    quantity: quantity
                })
            }
            else {
                if (existingProduct.quantity + quantity > existingProduct.product.stock) {
                    alert("not enough stock")
                    return
                }
                await axiosInstance.patch("/carts/" + existingProduct.id, {
                    quantity: existingProduct.quantity += quantity
                })
            }
        } catch (error) {
            console.log(error)
        }

        alert(quantity + ' added to cart')
        setStock(stock - quantity)
        setQuantity(0)
        fetchCart()
    }

    const addQuantity = () => {
        quantity < stock ? setQuantity(quantity + 1) : alert('not enough stock')
    }
    const removeQuantity = () => {
        quantity > 0 ? setQuantity(quantity - 1) : alert("quantity can't be zero")
    }

    // useEffect(() => {
    //     alert("component did mount")
    // }, [])

    // useEffect(() => {
    //     alert("component did update")
    // }, [quantity])
    // useEffect(() => {
    //     //unmount
    //     return () => {
    //         alert("component unmount")
    //     }
    // }, [])
    return (
        <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
            <Link to={"/product/" + props.id} className="aspect-square w-full overflow-hidden">
                <img
                    className="w-full"
                    src={props.imgUrl} alt="product" />
            </Link>
            <Link to={"/product/" + props.id}>
                <p className="text-md">{props.itemName}</p>
                <p className="text-xl font-semibold">
                    Rp {props.price ? props.price.toLocaleString("id-ID") : '0'}
                </p>
                <p className="text-sm text-muted-foreground">In stock : {stock}</p>
            </Link>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Button disabled={!quantity} onClick={removeQuantity} size="icon" variant="ghost"><IoIosRemove className="h-6 w-6" /></Button>
                    <p className="text-lg font-bold">{quantity}</p>
                    <Button disabled={quantity >= stock} onClick={addQuantity} size="icon" variant="ghost"><IoIosAdd className="h-6 w-6 " /></Button>
                </div>

                <Button onClick={() => addToCart(quantity)} className="w-full " disabled={stock <= 0 || quantity <= 0}>
                    {
                        stock > 0 ? "Add to cart" : "Out of stock"
                    }
                </Button>
            </div>
        </div>
    )
}