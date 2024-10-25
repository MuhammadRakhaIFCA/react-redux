import { IoAdd, IoCart, IoPerson, IoPricetag } from "react-icons/io5"
import { Button } from "../ui/button"
import AdminPage from "@/guard/AdminPage"

const SidebarItem = (props) => {
    const { children } = props

    return (
        <Button variant="ghost" size="lg" className="w-full justify-start rounded-none">
            {children}
        </Button>

    )
}

export const AdminLayout = (props) => {
    const { tittle, description, rightSection, children } = props

    return (
        <AdminPage>
            <div className="flex">
                <aside className="w-72 border-r h-screen">
                    <div className="h-16 flex flex-xol items-center justify-center border-b">
                        <h1 className="font-semibold text-xl">Admin Dashbord</h1>
                    </div>

                    <div className="flex flex-col space-y-0 py-4">
                        <SidebarItem>
                            <IoPricetag className="w-6 h-6 mr-4" /> Product Management
                        </SidebarItem>
                        <SidebarItem>
                            <IoCart className="w-6 h-6 mr-4" /> Order Management
                        </SidebarItem>
                    </div>

                </aside>
                <div className="flex-1">
                    <header className="h-16 border-b w-full flex justify-end items-center px-8">
                        <Button className="rounded-full" size="icon">
                            <IoPerson className="w-6 h-6" />
                        </Button>
                    </header>

                    <main className="flex flex-col p-4">
                        <div className="flex justify-between items-center pb-4 mb-8 border-b">
                            <div>
                                <h1 className="font-bold text-4xl">{tittle}</h1>
                                <p className="text-muted-foreground">{description}</p>
                            </div>

                            {rightSection}
                        </div>
                        {children}
                    </main>
                </div>
            </div>
        </AdminPage>
    )
}