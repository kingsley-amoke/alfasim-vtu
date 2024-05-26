import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/ThemeProvider";
import FloatingWhatsapp from "./components/FloatingWhatsapp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ALFASIM DATA",
  description: "Get affordable data here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-thin">
      <body className={`${inter.className} dark:bg-black w-[100vw] box-border`}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <FloatingWhatsapp />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
