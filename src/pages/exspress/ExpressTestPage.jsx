import axios from "axios"
import { useEffect } from "react"

const ExpressTestPage = () => {
    const fetchExpress = async () => {
        const response = await axios.get("http://127.0.0.1:3002/api")
        console.log(response.data.fruit)
    }

    useEffect(() => {
        fetchExpress()
    }, [])
    return (
        <>
        </>
    )
}

export default ExpressTestPage