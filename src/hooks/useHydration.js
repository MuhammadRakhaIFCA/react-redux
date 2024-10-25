import { axiosExpress, axiosInstance } from "@/lib/axios"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useHydration = () => {
    const dispatch = useDispatch()
    const [isHydrated, setIsHydrated] = useState(false)
    const hydrateAuth = async () => {
        try {

            const currentUser = localStorage.getItem("current-user")

            if (!currentUser) return

            const userReponse = await axiosExpress.get("/users/" + currentUser)

            dispatch({
                type: "USER_LOGIN",
                payload: {
                    username: userReponse.data.username,
                    id: userReponse.data.id,
                    role: userReponse.data.role
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsHydrated(true)
        }

    }
    useEffect(() => {
        hydrateAuth()
    }, [])

    return {
        isHydrated
    }
}