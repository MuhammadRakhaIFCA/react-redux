import { ProductForm } from "@/components/form/ProductForm"
import { AdminLayout } from "@/components/layout/AdminLayout"
import AdminPage from "@/guard/AdminPage"
import { axiosExpress, axiosInstance } from "@/lib/axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const ExpressEditProductPage = () => {
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
            const response = await axiosExpress.get("/products/" + params.productId)
            setProduct(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditProduct = async (values) => {
        try {
            const response = await axiosExpress.put("/products/edit", {
                itemName: values.itemName,
                price: values.price,
                stock: values.stock,
                imgUrl: values.imgUrl,
                id: product.id
            })
            alert('product edited')
            navigate("/express/admin/products")
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
                        defaultName={product.itemname}
                        defaultPrice={product.price}
                        defaultStock={product.stock}
                        defaultImgUrl={product.imgurl}
                    /> : null
            }

        </AdminLayout>
    )
}

export default ExpressEditProductPage