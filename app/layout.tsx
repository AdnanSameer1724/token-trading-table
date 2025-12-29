import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/components/providers/StoreProvider";
import QueryProvider from "@/app/components/providers/QueryProvider";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { ErrorBoundary } from "@/app/components/layout/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token Trading Table | Axiom Trade Clone",
  description: "Real-time token discovery and trading interface with live price updates",
  keywords: ["crypto", "tokens", "trading", "real-time", "blockchain"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <StoreProvider>
            <QueryProvider>
              <TooltipProvider>
                {children}
              </TooltipProvider>
            </QueryProvider>
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}