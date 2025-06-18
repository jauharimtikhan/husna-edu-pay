import { ThemeProvider } from "@/components/theme-provider";
import React, { PropsWithChildren } from "react";

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider>
            <div className="w-full h-svh flex items-center justify-center">
                {children}
            </div>
        </ThemeProvider>
    );
}
