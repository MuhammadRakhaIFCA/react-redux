import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const SignedInPage = (props) => {
    const userSelector = useSelector((state) => state.user)

    if (!userSelector.id) {

        return (
            <Navigate to="/"></Navigate>
        )
    }

    return props.children
}

export default SignedInPage