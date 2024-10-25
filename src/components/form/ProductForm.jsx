import { z } from "zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const productFormSchema = z.object({
    itemName: z.string().min(3, "item name have to be between 3 - 80 characters").max(80, "user name have to be between 3 - 80 characters"),
    price: z.coerce.number().min(1000, "price can't be bellow Rp 1.000"),
    stock: z.coerce.number().min(1, "stock can't be less than 1"),
    imgUrl: z.string().url("use a valid url")
})

export const ProductForm = (props) => {
    const [submitProductIsLoading, setsubmitProductIsLoading] = useState(false);
    const { onSubmit, cardTitle, defaultName, defaultPrice, defaultStock, defaultImgUrl } = props

    const form = useForm({
        defaultValues: {
            itemName: defaultName || "",
            price: defaultPrice || 0,
            stock: defaultStock || 0,
            imgUrl: defaultImgUrl || "",
        },
        resolver: zodResolver(productFormSchema),
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[540px]">
                <Card >
                    <CardHeader>
                        <CardTitle>
                            {cardTitle}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="itemName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price" //ini refer ke default values
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock" //ini refer ke default values
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imgUrl" //ini refer ke default values
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>img url</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col space-y-4 w-full">
                            <Button type="submit" disabled={submitProductIsLoading}>Submit</Button>

                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}