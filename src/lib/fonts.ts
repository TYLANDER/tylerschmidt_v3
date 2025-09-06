import localFont from "next/font/local"
import { Inter } from "next/font/google"

export const aeonik = localFont({
  src: [
    {
      path: "../../public/fonts/Aeonik-Full-Family-Web/Aeonik-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aeonik-Full-Family-Web/Aeonik-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aeonik-Full-Family-Web/Aeonik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aeonik-Full-Family-Web/Aeonik-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aeonik-Full-Family-Web/Aeonik-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aeonik-Full-Family-Web/Aeonik-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aeonik-Full-Family-Web/Aeonik-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
