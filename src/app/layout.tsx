import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Subnetting Kalkulátor",
   description: "Jednoduchý nástroj pro výpočet podsítí.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="cs" className="dark">
         <body className={`${inter.className} bg-zinc-100 dark:bg-zinc-900`}>
            {children}
         </body>
      </html>
   );
}
