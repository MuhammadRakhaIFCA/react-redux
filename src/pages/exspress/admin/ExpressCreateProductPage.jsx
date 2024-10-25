import { ProductForm } from "@/components/form/ProductForm"
import { AdminLayout } from "@/components/layout/AdminLayout"
import AdminPage from "@/guard/AdminPage"
import { axiosExpress, axiosInstance } from "@/lib/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



const ExpressCreateProductPage = () => {
    const navigate = useNavigate()
    const [addProductIsLoading, setAddProductIsLoading] = useState(false);



    const handleCreateProduct = async (values) => {
        try {
            setAddProductIsLoading(true);
            const response = await axiosExpress.post("/products/add", values)
            alert('product created')
            navigate("/express/admin/products")
        } catch (error) {
            console.log(error)
        }
        setAddProductIsLoading(false);
    }
    return (
        <AdminLayout tittle="create product" description="Add new product">
            <ProductForm onSubmit={handleCreateProduct} cardTitle="Add new product" />
        </AdminLayout>
    )
}

export default ExpressCreateProductPage