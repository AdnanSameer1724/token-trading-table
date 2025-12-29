import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./components/providers/StoreProvider";
import QueryProvider from "./components/providers/QueryProvider";
import { TooltipProvider } from "@/app/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token Trading Table | Axiom Trade Clone",
  description: "Real-time token discovery and trading interface with live price updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}