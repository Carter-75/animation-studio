import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { ToastContainer } from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: "Animation Studio",
  description: "A showcase of advanced web animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <ToastContainer />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
} 