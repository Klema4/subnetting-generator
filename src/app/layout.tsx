import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({ subsets: ["latin"] });

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
         <body className={`${space.className} bg-zinc-100 dark:bg-zinc-900`}>
            {children}
         </body>
      </html>
   );
}
