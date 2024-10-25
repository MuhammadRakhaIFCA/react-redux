import { AdminLayout } from "@/components/layout/AdminLayout"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminPage from "@/guard/AdminPage"
import { axiosInstance } from "@/lib/axios"
import { Delete } from "lucide-react"
import { Trash } from "lucide-react"
import { DeleteIcon } from "lucide-react"
import { Edit } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { ChevronLeft } from "lucide-react"
import { Ellipsis } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { IoAdd } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom"

const ProductManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [pageLimit, setPageLimit] = useState(100)
    const [productName, setProductName] = useState("")
    const [selectedProductIds, setSelectedProductIds] = useState([])

    const handleNextPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) + 1)
        setSearchParams(searchParams)
    }
    const handlePreviousPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) - 1)
        setSearchParams(searchParams)
    }

    const fetchProduct = async () => {

        try {
            const response = await axiosInstance.get("/products", {
                params: {
                    _per_page: 5,
                    _page: Number(searchParams.get("page")),
                    itemName: searchParams.get("search") //ini cari produk yang itemNamenya = setParams di function searchProduct
                }
            })
            setProducts(response.data.data)
            setPageLimit(Number(response.data.pages))

            if (Number(searchParams.get("page")) > Number(response.data.pages)) {
                searchParams.set("page", Number(response.data.pages))
                setSearchParams(searchParams)
            }


            console.log(response.data.pages)
        } catch (error) {
            console.log(error)
        }
    }

    const searchProduct = () => {
        if (productName) {
            searchParams.set("search", productName)
            setSearchParams(searchParams)
        } else {
            searchParams.delete("search")
            setSearchParams(searchParams)
        }
    }

    useEffect(() => {
        if (Number(searchParams.get("page")) <= 0) {
            searchParams.set("page", 1)
            setSearchParams(searchParams)
        }
        fetchProduct()
    }, [searchParams.get("page"), searchParams.get("search")])

    useEffect(() => {
        if (!searchParams.get("page")) {
            searchParams.set("page", 1)
            setSearchParams(searchParams)
        }
    }, [])

    const handleDeleteProduct = async (productId) => {
        const shouldDelete = confirm(`are you sure want to delete ${selectedProductIds.length} products?`)
        if (!shouldDelete) return

        const deletePromises = selectedProductIds.map((selectedProductId) => {
            return axiosInstance.delete("/products/" + selectedProductId) //ini di return dimasukkin ke array deletePromise
        })

        try {
            await Promise.all(deletePromises)

            alert(`${selectedProductIds.length} deleted`)

        } catch (error) {
            console.log(error)
        }

        searchParams.set("page", Number(1))
        setSearchParams(searchParams)
        setSelectedProductIds([])
    }

    const handleOnCheckedProduct = (productId, checked) => {
        if (checked) {
            const previousSelected = [...selectedProductIds]
            previousSelected.push(productId)

            setSelectedProductIds(previousSelected)
        } else {
            const productIdIndex = selectedProductIds.findIndex((id) => {
                return id == productId
            })

            const previousSelected = [...selectedProductIds]
            previousSelected.splice(productIdIndex, 1)

            setSelectedProductIds(previousSelected)
        }
    }

    return (
        <AdminLayout
            tittle="Product Management"
            description="this is the product management page"
            rightSection={
                <div className="flex gap-2">
                    {
                        selectedProductIds.length ?
                            <Button variant="destructive" onClick={handleDeleteProduct} >Delete {selectedProductIds.length} Product</Button>
                            : null
                    }
                    <Link to="/admin/products/create">
                        <Button >
                            <IoAdd className="w-6 h-6 mr-2" />
                            Add Product
                        </Button>
                    </Link>
                </div>

            }
        >
            <div className="mb-8">
                <Label>Seacrh Product</Label>
                <div className="flex gap-4">
                    <Input className="max-w-[400px]"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        placeHolder="Search product..."
                    />
                    <Button onClick={searchProduct}>Search</Button>
                </div>
            </div>
            <Table className="rounded-md border p-4">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products.map((product) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        <Checkbox onCheckedChange={(checked) => { handleOnCheckedProduct(product.id, checked) }}
                                            checked={selectedProductIds.includes(product.id)} />
                                    </TableCell>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.itemName}</TableCell>
                                    <TableCell>Rp {(product.price).toLocaleString("id-ID")}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <Link to={"/admin/products/edit/" + product.id}>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-6 h-6" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <Button variant="ghost" onClick={handlePreviousPage} disabled={Number(searchParams.get("page") == 1)}>
                            <ChevronLeft className="w-6 h-6 mr-2" /> previous
                        </Button>
                    </PaginationItem>
                    <PaginationItem className="font-semibold mx-8">
                        Page {searchParams.get("page")}
                    </PaginationItem>
                    <PaginationItem>
                        <Button variant="ghost" onClick={handleNextPage} disabled={Number(searchParams.get("page")) >= Number(pageLimit)}>
                            next <ChevronRight className="w-6 h-6 ml-2" />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </AdminLayout>
    )
}

export default ProductManagementPage