import { Link } from "react-router-dom"


const NotFoundPage = () => {
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
                <p className="text-6xl font-semibold">404 : Page Not Found</p>
                <Link to="/">Back to Home</Link>
            </div>
        </>
    )
}

export default NotFoundPage