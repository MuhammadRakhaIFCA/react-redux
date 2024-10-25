import { axiosInstance } from "@/lib/axios"
import { globalStore } from "@/store/store"

export const fetchCart = async (userId) => {
    try {
        const cartResponse = await axiosInstance.get("/carts/", {
            params: {
                userId: userId,
                _embed: "product"
            }
        })

        globalStore.dispatch({
            type: "CART_GET",
            payload: cartResponse.data
        })
    } catch (error) {
        console.log(error)
    }


}