import { useState, useEffect } from "react";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SignedInPage from "@/guard/SignedInPage";
import { axiosExpress, axiosInstance } from "@/lib/axios";
import { fetchCart } from "@/services/ExpressCartService";
import { useSelector } from "react-redux";
import { ExpressCartItem } from "@/components/ExpressCartItem";


const ExpressCartPage = () => {
    const [cartSelector, setCartSelector] = useState([]); // Manage cart state
    const userSelector = useSelector((state) => state.user); // Get user from Redux

    const fetchData = async () => {
        try {
            const cartData = await fetchCart(userSelector.id);
            setCartSelector(cartData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    if (!cartSelector) {
        return <div>Loading...</div>; // Loading state while data is being fetched
    }

    const totalPrice = cartSelector.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    const handleCheckout = async () => {
        try {
            for (let i = 0; i < cartSelector.length; i++) {
                const currentCartItem = cartSelector[i];

                if (currentCartItem.quantity > currentCartItem.stock) {
                    alert('One of your items is out of stock');
                    return;
                }
            }


            await axiosExpress.post("/transactions", {
                userId: userSelector.id,
                totalPrice: totalPrice,
                tax: totalPrice / 10,
                items: cartSelector
            });

            cartSelector.forEach(async (cartItem) => {
                await axiosExpress.put("/products/stock", {
                    userId: userSelector.id,
                    productId: cartItem.productid
                })
                await axiosExpress.delete("/carts/delete", {
                    data: {
                        userId: userSelector.id,
                        productId: cartItem.productid
                    }
                })
            })

            // await axiosExpress.delete("/carts/clear", {
            //     data: {
            //         userId: userSelector.id
            //     }
            // })


            alert('Checkout successful');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SignedInPage>
            <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
                <h1 className="text-3xl font-bold">My Cart</h1>
                <div className="mt-10">
                    <Separator />
                    <div className="grid grid-cols-12 gap-8 my-8">
                        <div className="col-span-7 gap-6 flex flex-col">
                            {cartSelector.map((item) => (
                                <>
                                    <Separator />
                                    <ExpressCartItem
                                        key={item.id}
                                        cartId={item.id}
                                        name={item.itemname}
                                        price={item.price}
                                        imgUrl={item.imgurl}
                                        quantity={item.quantity}
                                        stock={item.stock}
                                        productId={item.productid}
                                        onCartUpdate={fetchData}
                                    />
                                </>
                            ))}
                        </div>
                        <Card className="col-span-5 bg-gray-50 border-0 h-min">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex pb-4 justify-between border-b">
                                    {/* <Button onClick={console.log(cartSelector)}>BUTTON</Button> */}
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
                                    <span className="text-muted-foreground font-semibold">Order Total</span>
                                    <span className="font-semibold">Rp {(totalPrice + totalPrice / 10).toLocaleString("id-ID")}</span>
                                </div>
                                <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </SignedInPage>
    );
};

export default ExpressCartPage;
