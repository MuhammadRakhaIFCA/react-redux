
import { ProductCard } from "../components/ProductCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";



const productRaw = [
    {
        itemName: "kaos hitam",
        price: 100000,
        stock: 10,
        imgUrl: "https://www.groupe.nyc/cdn/shop/products/56199ae544f793b2a10f48812cba1dc0_958x1198.png?v=1622044961"
    },
    {
        itemName: "kaos putih",
        price: 200000,
        stock: 20,
        imgUrl: "https://www.groupe.nyc/cdn/shop/products/56199ae544f793b2a10f48812cba1dc0_958x1198.png?v=1622044961"
    }
]

const HomePage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])

    const userSelector = useSelector((state) => state.user)

    const productsList = products.map((product) => {
        return (
            <ProductCard id={product.id} itemName={product.itemName} price={product.price} stock={product.stock} imgUrl={product.imgUrl} />
        )
    })

    const fetchProduct = async () => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get("/products")
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

export default HomePage;