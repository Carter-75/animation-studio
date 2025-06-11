import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
} 