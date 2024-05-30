import { HeaderAdmin } from "@/components/header-admin";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
        <>
            <HeaderAdmin />
            <div>
                <Outlet />
            </div>
        </>
    )
}