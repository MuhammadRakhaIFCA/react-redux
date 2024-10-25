import { HistoryItem } from "@/components/HistoryItem"
import { axiosInstance } from "@/lib/axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import SignedInPage from "@/guard/SignedInPage";
import { useEffect } from "react";
import { format } from "date-fns"

const HistoryPage = () => {
    const [transactions, setTransactions] = useState([])
    const userSelector = useSelector((state) => state.user)

    const fetchTransactionHistory = async () => {
        try {
            const historyResponse = await axiosInstance.get("/transactions", {
                params: {
                    userId: userSelector.id
                }
            })
            setTransactions(historyResponse.data)

            // const flattenedTransactions = historyResponse.data.map(transaction => {
            //     return {
            //         ...transaction,
            //         items: transaction.items.flat() // Flatten nested array
            //     };
            // });

            // setTransactions(flattenedTransactions);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTransactionHistory()

    }, [])
    return (
        <SignedInPage>
            <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <div className="flex flex-col mt-8 gap-24">
                    {
                        transactions.map((transaction) => {
                            return (
                                <HistoryItem
                                    key={transaction.id}
                                    id={transaction.id}
                                    totalPrice={transaction.totalPrice}
                                    tax={transaction.tax}
                                    transactionDate={format(new Date(transaction.transactionDate), "dd MMM yyyy")}
                                    items={transaction.items}

                                />
                            )
                        })
                    }
                </div>
            </main>
        </SignedInPage>
    )
}

export default HistoryPage