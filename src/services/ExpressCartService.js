import { axiosExpress, axiosInstance } from "@/lib/axios"


export const fetchCart = async (userId) => {
    try {
        const cartResponse = await axiosExpress.get("/carts/" + userId)
        //console.log("data : " + JSON.stringify(cartResponse.data))
        return cartResponse.data
    } catch (error) {
        console.error("Error fetching cart: ", error);
    }
};


