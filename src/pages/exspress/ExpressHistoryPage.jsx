import { HistoryItem } from "@/components/HistoryItem"
import { axiosExpress, axiosInstance } from "@/lib/axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import SignedInPage from "@/guard/SignedInPage";
import { useEffect } from "react";
import { format } from "date-fns"
import { ExpressHistoryItem } from "@/components/ExpressHistoryItem";
import { Button } from "@/components/ui/button";

const ExpressHistoryPage = () => {
    const [transactions, setTransactions] = useState([])
    const userSelector = useSelector((state) => state.user)

    const fetchTransactionHistory = async () => {
        try {
            const historyResponse = await axiosExpress.get("/transactions/" + userSelector.id)
            console.log(historyResponse.data)
            // setTransactions(historyResponse.data)
            setTransactions([
                {
                    id: 49, totalPrice: 2000000, tax: 200000, transactionDate: '2024-10-21T03:29:51.236Z',
                    items: Array(1)
                },
                {
                    id: 50, totalPrice: 2000000, tax: 200000, transactionDate: '2024-10-21T03:30:41.694Z',
                    items: Array(1)
                },
                {
                    id: 51, totalPrice: 2000000, tax: 200000, transactionDate: '2024-10-21T03:33:17.504Z',
                    items: Array(1)
                },
                {
                    id: 52, totalPrice: 120000, tax: 12000, transactionDate: '2024-10-21T04:05:50.451Z',
                    items: Array(3)
                },
                {
                    id: 53, totalPrice: 120000, tax: 12000, transactionDate: '2024-10-21T04:12:07.018Z',
                    items: Array(3)
                },
                {
                    id: 54, totalPrice: 120000, tax: 12000, transactionDate: '2024-10-21T04:14:21.656Z',
                    items: Array(3)
                },

            ])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTransactionHistory()
    }, [])

    useEffect(() => {
        console.log("current transaction : ", transactions)
    }, [transactions])

    return (
        <SignedInPage>
            <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <div className="flex flex-col mt-8 gap-24">
                    {

                        transactions.map((transaction) => {
                            return (
                                transactions ?
                                    <ExpressHistoryItem
                                        key={transaction.id}
                                        id={transaction.id}
                                        totalPrice={transaction.totalPrice}
                                        tax={transaction.tax}
                                        transactionDate={format(new Date(transaction.transactionDate), "dd MMM yyyy")}
                                        items={transaction.items}
                                    /> : <div>nothing here</div>
                            )
                        })
                    }
                </div>
            </main>
        </SignedInPage>
    )
}

export default ExpressHistoryPage