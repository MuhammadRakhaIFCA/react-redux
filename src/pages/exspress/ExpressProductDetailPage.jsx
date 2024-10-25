import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { axiosExpress, axiosInstance } from "@/lib/axios";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io"
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";


// const product = {
//     id: 1,
//     itemName: "kaos hitam",
//     price: 100000,
//     stock: 5,
//     imgUrl: "https://www.groupe.nyc/cdn/shop/products/56199ae544f793b2a10f48812cba1dc0_958x1198.png?v=1622044961"
// }






function ExpressProductDetailPage() {
    const [product, setProduct] = useState({
        id: 0,
        itemname: "",
        price: 0,
        stock: 0,
        imgurl: ""
    })
    const [quantity, setQuantity] = useState(0);
    const [productIsLoading, setProductIsLoading] = useState(true);
    const params = useParams();

    const fetchProduct = async () => {
        try {
            setProductIsLoading(true);
            const response = await axiosExpress.get("/products/" + params.productId)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setProductIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
            <div className="grid grid-cols-2 gap-8">
                {
                    productIsLoading ? <Skeleton className="w-full h-[582px]" /> :
                        <img src={product.imgurl} alt={product.itemname} className="w-full" />
                }

                <div className="flex flex-col gap-1 justify-center">
                    {
                        productIsLoading ? <Skeleton className="w-[250px] h-[32px]" /> :
                            <h1 className="text-xl">{product.itemname}</h1>
                    }
                    {
                        productIsLoading ? <Skeleton className="w-[350px] h-[48px]" /> :
                            <h3 className="text-3xl">{product.price.toLocaleString("id-ID")}</h3>
                    }
                    {
                        productIsLoading ? <Skeleton className="w-[350px] h-[120px] mt-4" /> :
                            <p className="text-sm text-muted-foreground mt-4">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus repellendus voluptatum repellat nulla quis corrupti consequuntur maxime omnis eaque, officia quae fugit molestiae aliquid laboriosam fugiat perferendis nisi labore! Modi assumenda ea atque consequuntur distinctio.
                            </p>
                    }
                    <div className="flex items-center gap-8 mt-6">
                        <Button size="icon" variant="ghost"><IoIosRemove className="h-6 w-6" /></Button>
                        <p className="text-lg font-bold">{quantity}</p>
                        <Button size="icon" variant="ghost"><IoIosAdd className="h-6 w-6 " /></Button>
                    </div>
                    <div className="flex items-center mt-4 gap-4">
                        <Button className="w-full" size="lg">Add to cart</Button>
                        <Button size="icon" variant="ghost">
                            <IoHeartOutline className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ExpressProductDetailPage