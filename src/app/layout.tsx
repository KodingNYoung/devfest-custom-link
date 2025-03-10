import type {Metadata} from "next";
import "../styles/globals.css";
import React from "react";
import {cls} from "@/utils/helpers";
import {plusJakartaSans} from "@/assets/font";
import AppLayout from "@/components/templates/app-layout";
import {LayoutFC} from "@/utils/types";


export const metadata: Metadata = {
    title: {
        default: "eusate chatbot",
        template: "%s | eusate",
    },
    description: "Supercharge your customer support with our AI powered agents",
};

const RootLayout: LayoutFC = ({children}) => {
    return (
        <html lang="en" className={cls("h-full max-h-[780px]", plusJakartaSans.variable)}>
        <body>
        <AppLayout>
            {children}
        </AppLayout>
        </body>
        </html>
    );
}

export default RootLayout;