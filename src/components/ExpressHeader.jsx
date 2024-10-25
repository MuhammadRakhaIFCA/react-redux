import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { IoCart, IoHeart } from 'react-icons/io5'
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"
import { useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "@/lib/axios"
import { useEffect } from "react"

import { History } from "lucide-react"
import { fetchCart } from "@/services/ExpressCartService"
import axios from "axios"

export const ExpressHeader = () => {

    const userSelector = useSelector((state) => state.user)
    const [cartSelector, setCartSelector] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartData = await fetchCart(userSelector.id); // Fetch user's cart based on their id
                setCartSelector(cartData); // Set cart data to state
            } catch (error) {
                console.log(error);
            }
        };

        if (userSelector.id) {
            console.log("cart data : " + JSON.stringify(cartSelector))
            fetchData(); // Only fetch cart if user is logged in
        }
    }, [userSelector.id]);

    const dispatch = useDispatch()

    const handleLogOut = () => {
        localStorage.removeItem("current-user")

        dispatch({
            type: "USER_LOGOUT"
        })
    }


    return (
        <header className="h-16 border-b border-solid flex items-center justify-between px-8">
            <Link to="/express">
                <p className="text-2xl font-bold hover:cursor-pointer">FastKampus</p>
            </Link>
            <Input className="max-w-[600px]" placeholder="search product"></Input>
            <div className="flex space-x-4 h-5 items-center">
                <div className="flex space-x-2">
                    <Link to="/express/cart">
                        <Button variant="ghost">
                            <IoCart className="w-6 h-6 mr-2" />
                            <span>
                                {
                                    userSelector.id ? 1 : 2
                                }
                            </span>
                        </Button>
                    </Link>
                    <Link to="/express/history">
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
                                <Link to="/express/loginjwt">
                                    <Button>JWT</Button>
                                </Link>
                                <Link to="/express/login">
                                    <Button>Log in</Button>
                                </Link>
                                <Link to="/express/register">
                                    <Button variant="outline">Sign Up</Button>
                                </Link>
                            </>
                    }


                </div>


            </div>
        </header>
    )
}