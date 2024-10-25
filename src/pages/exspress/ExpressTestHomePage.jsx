import { Button } from "@/components/ui/button"
import { axiosExpress } from "@/lib/axios"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ExpressTestHomePage = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axiosExpress.get("/users/logged", { withCredentials: true }).then((res) => {
            if (res.data.valid) {
                console.log(res.data.user)
            }
            else {
                navigate('/express/login/session')
            }
        }
        ).catch(err => console.log("error : " + err))
    }, [])

    const click = () => {
        const result = axiosExpress.get("/users/logged")
        console.log(result)
    }
    return (
        <div>
            <Button onClick={click}>press</Button>
        </div>
    )
}

export default ExpressTestHomePage