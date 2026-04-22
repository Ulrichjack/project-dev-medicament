import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Navbar from "@/components/layout/Navbar";
=======
import Providers from "./Providers";
>>>>>>> feature/auth-v3

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PharmApp",
<<<<<<< HEAD
  description: "Plateforme de gestion de médicaments",
=======
  description: "Application de pharmacie",
>>>>>>> feature/auth-v3
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main>{children}</main>
=======
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
>>>>>>> feature/auth-v3
      </body>
    </html>
  );
}