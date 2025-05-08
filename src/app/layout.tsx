import type { Metadata } from "next";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";


const neueHaas = localFont({
  src: [
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-XXThin.woff2",
      weight: "50",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-XThin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-Mediu.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas/NeueHaasDisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas",
  display: "swap",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enyata Talent Board",
  description: "Scout and Hire Talent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${neueHaas.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </body>
    </html>
  );
}
