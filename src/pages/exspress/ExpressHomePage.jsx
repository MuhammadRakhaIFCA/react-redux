
import { ProductCard } from "../../components/ProductCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { axiosExpress, axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ExpressProductCard } from "@/components/ExpressProductCard";




const ExpressHomePage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    const userSelector = useSelector((state) => state.user)

    const productsList = products.map((product) => {
        return (
            <ExpressProductCard key={product.id} id={product.id} itemName={product.itemname} price={product.price} stock={product.stock} imgUrl={product.imgurl} />
        )
    })

    const fetchProduct = async () => {
        setIsLoading(true)
        try {
            const response = await axiosExpress.get("/products")
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
                <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Become a trend-setter with us {userSelector.email}</h1>
                    <p className="mt-6 text-lg max-w-prose text-muted-foreground">FastCampusCommerce provides you with the finest clothings and ensures your confidence throuout the day</p>
                </div>
                {
                    isLoading ? <p>Loading...</p> : <div className="grid grid-cols-2 gap-4">
                        {productsList}
                    </div>
                }
            </main>
        </>

    );
}

export default ExpressHomePage;