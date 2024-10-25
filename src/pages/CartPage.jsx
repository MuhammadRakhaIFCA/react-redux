import { CartItem } from "@/components/CartItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import SignedInPage from "@/guard/SignedInPage"
import { axiosInstance } from "@/lib/axios"
import { fetchCart } from "@/services/cartService"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const CardPage = () => {
    const cartSelector = useSelector((state) => state.cart)
    const userSelector = useSelector((state) => state.user)
    const totalPrice = (cartSelector.items.reduce((total, item) => {
        return total + item.product.price * item.quantity
    }, 0))

    const handleCheckout = async () => {
        for (let i = 0; i < cartSelector.items.length; i++) {
            const currentCartItem = cartSelector.items[i]

            if (currentCartItem.quantity > currentCartItem.product.stock) {
                alert('one of your item is out of stock')
                return
            }

        }
        await axiosInstance.post("/transactions", {
            userId: userSelector.id,
            totalPrice: totalPrice,
            tax: totalPrice / 10,
            transactionDate: new Date(),
            items: [cartSelector.items]
        })

        cartSelector.items.forEach(async (cartItem) => {
            await axiosInstance.patch("/products/" + cartItem.productId, {
                stock: cartItem.product.stock - cartItem.quantity
            })
        })

        cartSelector.items.forEach(async (cartItem) => {
            await axiosInstance.delete("/carts/" + cartItem.id)
        })
        alert('checkout sucessfull')

        fetchCart()
    }


    return (
        <SignedInPage>
            <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
                <h1 className="text-3xl font-bold">My Cart</h1>
                <div className="mt-10">
                    <Separator />
                    <div className="grid grid-cols-12 gap-8 my-8">
                        <div className="col-span-7 gap-6 flex flex-col">
                            {cartSelector.items.map((item) => {
                                return (<>
                                    <Separator />
                                    <CartItem
                                        key={item.id}
                                        cartId={item.id}
                                        name={item.product.itemName}
                                        price={item.product.price}
                                        imgUrl={item.product.imgUrl}
                                        quantity={item.quantity}
                                        stock={item.product.stock}
                                    />
                                </>
                                )
                            })}
                        </div>
                        <Card className="col-span-5 bg-gray-50 border-0 h-min">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex pb-4 justify-between border-b">
                                    <span className="text-sm text-muted-foreground">Subtotal</span>
                                    <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex pb-4 justify-between border-b">
                                    <span className="text-sm text-muted-foreground">Tax</span>
                                    <span>Rp {(totalPrice / 10).toLocaleString("id-ID")}</span>
                                </div>

                            </CardContent>
                            <CardFooter className="flex-col flex gap-6">
                                <div className="flex justify-between w-full">
                                    <span className="text-muted-foreground font-semibold">
                                        Order Total
                                    </span>
                                    <span className="font-semibold">
                                        Rp {(totalPrice + totalPrice / 10).toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </SignedInPage>
    )
}

export default CardPage