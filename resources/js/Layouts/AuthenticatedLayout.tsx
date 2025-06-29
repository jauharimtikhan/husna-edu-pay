import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Head } from "@inertiajs/react";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
interface AuthtenticatedLayoutProps {
    children: React.ReactNode;
    title?: string;
}
export default function AuthenticatedLayout({
    children,
    title,
}: AuthtenticatedLayoutProps) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="husna-edupay-theme">
            <ToasterSonner />
            <SidebarProvider>
                <Head title={title || "Admin Panel"} />
                <AppSidebar variant="inset" />

                <SidebarInset>
                    <SiteHeader title={title} />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
