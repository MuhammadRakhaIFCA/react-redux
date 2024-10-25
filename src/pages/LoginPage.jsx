import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { axiosInstance } from "@/lib/axios"
import { useDispatch } from "react-redux"
import GuestPage from "@/guard/GuestPage"

const loginFormSchema = z.object({
    username: z.string().min(3, "user name have to be between 3 - 16 characters").max(16, "user name have to be between 3 - 16 characters"),
    password: z.string().min(8, "password have to be at least 8 characters long")
})

const LoginPage = () => {
    const dispatch = useDispatch()

    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: zodResolver(loginFormSchema),
        reValidateMode: "onChange"
    })

    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)

    const handleLogin = async (values) => {
        try {
            const userReponse = await axiosInstance("/users", {
                params: {
                    username: values.username,
                    password: values.password
                }
            })
            if (userReponse.data.length == 0) {
                alert("Invalid Credentials")
                return
            }

            alert("logged in as " + userReponse.data[0].username)
            dispatch({
                type: "USER_LOGIN",
                payload: {
                    username: userReponse.data[0].username,
                    id: userReponse.data[0].id,
                    role: userReponse.data[0].role
                }
            })

            localStorage.setItem("current-user", userReponse.data[0].id)
            form.reset()
            console.log(userReponse.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GuestPage>
            <main className="container px-4 py-8 flex flex-col justify-center items-center h-[80vh]">
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-[540px]">
                        <Card >
                            <CardHeader>
                                <CardTitle>
                                    Welcome back!
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{field.error?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="password" //ini refer ke default values
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type={isChecked ? "text" : "password"} />
                                                </FormControl>
                                                <FormMessage>{field.error?.message}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="show-password" onCheckedChange={(checked) => {
                                        setIsChecked(checked)
                                    }} />
                                    <label htmlFor="show-password">Show Password</label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col space-y-4 w-full">
                                    <Button type="submit" >Login</Button>
                                    <Button variant="link">Sign up instead</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </main>
        </GuestPage>
    )
}

export default LoginPage