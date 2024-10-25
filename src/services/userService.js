import { axiosExpress, axiosInstance } from "@/lib/axios"


export const fetchUser = async (userId) => {
    try {
        const userResponse = await axiosExpress.get("/users/logged")
        console.log("data : " + JSON.stringify(userResponse))
        return userResponse.data
    } catch (error) {
        console.error("Error fetching user: ", error);
    }
};

