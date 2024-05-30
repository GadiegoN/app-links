import { HeaderApp } from "@/components/header-app";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <div>
            <HeaderApp />

            <div>
                <Outlet />
            </div>
        </div>
    )
}