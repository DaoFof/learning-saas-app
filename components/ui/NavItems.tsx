"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "My Journey",
        href: "/my-journey"
    },
    {
        label: "Companions",
        href: "/companions"
    }
]

const NavItems = () => {
    const pathname = usePathname();


    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({ label, href }) => (
                <Link key={label} href={href} className={cn(
                    pathname === href && "text-primary font-semibold"
                )}>
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems