import * as React from "react";
import {
    ClipboardList,
    DollarSign,
    FolderIcon,
    LayoutDashboardIcon,
    UsersIcon,
    Settings2,
    WalletMinimal,
    GlobeLock,
    Info,
    Siren,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { Link, usePage } from "@inertiajs/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const userData = usePage().props.auth.user;
    const data = {
        navMain: [
            {
                title: "Beranda",
                url: route("home.index"),
                icon: LayoutDashboardIcon,
                active: route().current("home.*"),
            },
            {
                title: "Tagihan",
                url: route("tagihan.index"),
                icon: ClipboardList,
                active: route().current("tagihan.*"),
            },
            {
                title: "Transaksi",
                url: route("transaksi.index"),
                icon: DollarSign,
                active: route().current("transaksi.*"),
            },
            {
                title: "History Pembayaran",
                url: route("history.index"),
                icon: FolderIcon,
                active: route().current("history.*"),
            },
            {
                title: "Pengguna",
                url: route("user.index"),
                icon: UsersIcon,
                active: route().current("user.*"),
            },
        ],
        navSetings: [
            {
                name: "Daftar Metode Pembayaran",
                url: route("pengaturan.payment.method.list"),
                active: route().current("pengaturan.payment.method.*"),
                icon: WalletMinimal,
            },
            {
                name: "Kebijakan Privasi",
                url: route("pengaturan.kebijakan-privasi.index"),
                active: route().current("pengaturan.kebijakan-privasi.*"),
                icon: GlobeLock,
            },
            {
                name: "Bantuan",
                url: route("pengaturan.bantuan.index"),
                active: route().current("pengaturan.bantuan.*"),
                icon: Info,
            },
            {
                name: "Syarat & Ketentuan",
                url: route("pengaturan.syarat-ketentuan.index"),
                active: route().current("pengaturan.syarat-ketentuan.*"),
                icon: Siren,
            },
        ],
    };
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex justify-between items-center gap-2">
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <Link href={route("home.index")}>
                                    <span className="text-base font-semibold">
                                        Husna Edu Pay
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                            <ModeToggle />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments items={data.navSetings} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
        </Sidebar>
    );
}
