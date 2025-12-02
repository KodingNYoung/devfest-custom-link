import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import React from "react";
import { cls } from "@/utils/helpers";
import { plusJakartaSans } from "@/assets/font";
import { LayoutFC } from "@/utils/types";
import Providers from "@/providers";
import AppLayout from "@/components/templates/app-layout";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "DevfestAkure Help",
  description:
    "Your AI companion for DevFest Akure 2025. Get instant answers about schedules, speakers, venue, and registration. Powered by SATE from Eusate.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

const RootLayout: LayoutFC = ({ children }) => {
  return (
    <html lang="en" className={cls("h-full", plusJakartaSans.variable)}>
      <GoogleAnalytics gaId="G-00XRYQ54TN" />
      <body className="max-w-2xl mx-auto bg-gray-50">
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
