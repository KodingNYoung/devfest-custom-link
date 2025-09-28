import localFont from "next/font/local";

export const plusJakartaSans = localFont<"--font-app">({
  src: [
    { path: "./PlusJakartaSans-Regular.ttf", weight: "400" },
    { path: "./PlusJakartaSans-Medium.ttf", weight: "500" },
    { path: "./PlusJakartaSans-SemiBold.ttf", weight: "600" },
    { path: "./PlusJakartaSans-Bold.ttf", weight: "700" },
  ],
  variable: "--font-app",
  display: "swap",
  adjustFontFallback: false,
});
