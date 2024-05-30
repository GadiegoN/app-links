import { Logo } from "@/assets/logo";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="flex flex-col w-screen h-screen justify-center">
            <Logo />
            <Outlet />
        </div>
    )
}