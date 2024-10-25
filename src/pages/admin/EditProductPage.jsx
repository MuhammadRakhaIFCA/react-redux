import { ProductForm } from "@/components/form/ProductForm"
import { AdminLayout } from "@/components/layout/AdminLayout"
import AdminPage from "@/guard/AdminPage"
import { axiosInstance } from "@/lib/axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const EditProductPage = () => {
    const params = useParams()
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        id: 0,
        itemName: "",
        price: 0,
        stock: 0,
        imgUrl: ""
    })

    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get("/products/" + params.productId)
            setProduct(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditProduct = async (values) => {
        try {
            const response = await axiosInstance.patch("/products/" + params.productId, values)
            alert('product edited')
            navigate("/admin/products")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <AdminLayout tittle="Edit Product" description="edit existing product">
            {
                product.id ?
                    <ProductForm
                        onSubmit={handleEditProduct}
                        cardTitle="Edit product"
                        defaultName={product.itemName}
                        defaultPrice={product.price}
                        defaultStock={product.stock}
                        defaultImgUrl={product.imgUrl}
                    /> : null
            }

        </AdminLayout>
    )
}

export default EditProductPage