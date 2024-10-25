import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import GuestPage from "@/guard/GuestPage";

// Define the schema for validation using zod
const registerFormSchema = z
    .object({
        username: z.string().min(3, "Username must be between 3 - 16 characters").max(16, "Username must be between 3 - 16 characters"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password != confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "password do not match",
                path: ["confirmPassword"]
            })
        }
    });

const RegisterPage = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(registerFormSchema),
        reValidateMode: "onChange",
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleRegister = async (values) => {
        try {
            await axiosInstance.post("/users", {
                username: values.username,
                password: values.password,
                role: "user"
            })

            alert("user registered")
            form.reset()
        } catch (error) {
            console.log(error)
        }


    };

    return (
        <GuestPage>
            <main className="container px-4 py-8 flex flex-col justify-center items-center h-[80vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className="w-full max-w-[540px] mx-5">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create a new account!</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field, fieldState }) => (  // fieldState provides error information
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage> {/* Show validation error */}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type={isChecked ? "text" : "password"} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage> {/* Show validation error */}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type={isChecked ? "text" : "password"} />
                                            </FormControl>
                                            <FormMessage>{fieldState.error?.message}</FormMessage> {/* Show validation error */}
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="show-password" onCheckedChange={(checked) => setIsChecked(checked)} />
                                    <label htmlFor="show-password">Show Password</label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col space-y-4 w-full">
                                    <Button type="submit">
                                        Register
                                    </Button>
                                    <Button variant="link">Login instead</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </main>
        </GuestPage>
    );
};

export default RegisterPage;
