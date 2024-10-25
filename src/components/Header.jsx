import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { IoCart, IoHeart } from 'react-icons/io5'
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"
import { useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "@/lib/axios"
import { useEffect } from "react"
import { fetchCart } from "@/services/cartService"
import { History } from "lucide-react"

export const Header = () => {
    const userSelector = useSelector((state) => state.user)
    const cartSelector = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const handleLogOut = () => {
        localStorage.removeItem("current-user")

        dispatch({
            type: "USER_LOGOUT"
        })
    }

    // const fetchCart = async () => {
    //     try {
    //         const cartResponse = await axiosInstance.get("/carts/", {
    //             params: {
    //                 userId: userSelector.id,
    //                 _embed: "product"
    //             }
    //         })

    //         dispatch({
    //             type: "CART_GET",
    //             payload: cartResponse.data
    //         })
    //         console.log(cartResponse.items)
    //     } catch (error) {
    //         console.log(error)
    //     }


    // }
    useEffect(() => {
        fetchCart(userSelector.id)
    }, [])
    return (
        <header className="h-16 border-b border-solid flex items-center justify-between px-8">
            <Link to="/">
                <p className="text-2xl font-bold hover:cursor-pointer">FastKampus</p>
            </Link>
            <Input className="max-w-[600px]" placeholder="search product"></Input>
            <div className="flex space-x-4 h-5 items-center">
                <div className="flex space-x-2">
                    <Link to="/cart">
                        <Button variant="ghost">
                            <IoCart className="w-6 h-6 mr-2" />
                            <span>{cartSelector.items.length}</span>
                        </Button>
                    </Link>
                    <Link to="/history">
                        <Button size="icon" variant="ghost">
                            <History className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>

                <Separator orientation="vertical" className="h-full" />

                <div className="flex space-x-2">
                    {
                        userSelector.id ?
                            <>
                                <p>hello {userSelector.username} ({userSelector.role})</p>
                                <Button variant="destructive" onClick={handleLogOut}>Log out</Button>
                            </>
                            :
                            <>
                                <Link to="/login">
                                    <Button>Log in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="outline">Sign Up</Button>
                                </Link>
                            </>
                    }


                </div>


            </div>
        </header>
    )
}