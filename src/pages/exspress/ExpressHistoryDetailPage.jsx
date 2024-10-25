import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SignedInPage from "@/guard/SignedInPage"
import { axiosExpress, axiosInstance } from "@/lib/axios"
import { format } from "date-fns"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"

const ExpressHistoryDetailPage = () => {
    const params = useParams()
    const userSelector = useSelector((state) => state.user)
    const [historyDetail, setHistoryDetail] = useState({
        id: "",
        userId: "",
        totalPrice: 0,
        tax: 0,
        transactionDate: null,
        items: []
    })
    const totalPrice = 100000

    const fetchHistoryDetail = async () => {
        try {
            const historyDetailResponse = await axiosExpress.get("/transactions/details/" + params.transactionId)
            setHistoryDetail(historyDetailResponse.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchHistoryDetail()
    }, [])
    if (userSelector.id !== historyDetail.userId && historyDetail.userId) {
        return <Navigate to="/" />
    }
    return (
        <SignedInPage>
            <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
                <h1 className="text-3xl font-bol">INV-{historyDetail.id}</h1>
                <h2 className="text-xl font-bold">{format(new Date(historyDetail.transactionDate), "dd MMM yyyy")}</h2>


                <Card className="col-span-5 bg-gray-50 border-0 h-min m-5">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex pb-4 justify-between border-b">
                            <span className="text-sm text-muted-foreground">Subtotal</span>
                            <span>Rp {historyDetail.totalPrice.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex pb-4 justify-between border-b">
                            <span className="text-sm text-muted-foreground">Tax</span>
                            <span>Rp {historyDetail.tax.toLocaleString("id-ID")}</span>
                        </div>

                    </CardContent>
                    <CardFooter className="flex-col flex gap-6">
                        <div className="flex justify-between w-full">
                            <span className="text-muted-foreground font-semibold">
                                Order Total
                            </span>
                            <span className="font-semibold">
                                Rp {(historyDetail.totalPrice + historyDetail.tax).toLocaleString("id-ID")}
                            </span>
                        </div>


                    </CardFooter>
                </Card>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead colSpan={2}>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            historyDetail.items.flat().map((cartItem) => {

                                return (
                                    <TableRow className="text-muted-foreground font-semibold">
                                        <TableCell colSpan={2}>
                                            <div className="flex items-center gap-6">
                                                <div className="aspect-square w-[100px] overflow-hidden rounded-md">
                                                    <img src={cartItem.product.imgUrl} alt="" />
                                                </div>

                                                <p className="font-semibold text-primary">
                                                    {cartItem.product.itemName}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            Rp {cartItem.product.price.toLocaleString("id-ID")}
                                        </TableCell>
                                        <TableCell>
                                            {cartItem.quantity}
                                        </TableCell>
                                        <TableCell>
                                            Rp {(cartItem.product.price * cartItem.quantity).toLocaleString("id-ID")}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </main>
        </SignedInPage>
    )
}

export default ExpressHistoryDetailPage