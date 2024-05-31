import { useTheme } from "@/components/theme-provider";
import { auth } from "@/services/firebase-connection"

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sun, Moon, LogOut, Home, Link2, UserCircle } from "lucide-react";
import { Logo } from "@/assets/logo";


export function HeaderAdmin() {
    const { setTheme } = useTheme()

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <div className="w-full max-w-xl mx-auto p-10 flex justify-between items-center">
            <Logo />
            <div className="flex gap-2 items-center">
                <div className="flex">
                    <Button variant="link"><Link to="/"><p className="sr-only md:not-sr-only lg:not-sr-only">Home</p><Home className="not-sr-only md:sr-only lg:sr-only" /></Link></Button>
                    <Button variant="link"><Link to="/painel"><p className="sr-only md:not-sr-only lg:not-sr-only">Link</p><Link2 className="not-sr-only md:sr-only lg:sr-only" /></Link></Button>
                    <Button variant="link"><Link to="/painel/social"><p className="sr-only md:not-sr-only lg:not-sr-only">Sociais</p><UserCircle className="not-sr-only md:sr-only lg:sr-only" /></Link></Button>
                </div>
                <Button variant="destructive" size="icon" onClick={handleLogout}>
                    <LogOut className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="default" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}