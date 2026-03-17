import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eyob - Portfolio | Next.js & Tailwind CSS",
  description: "Full-stack developer specializing in Next.js and Tailwind CSS. Check out my portfolio and projects.",
  keywords: ["Next.js", "Tailwind CSS", "Portfolio", "Developer", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Simple Font Awesome link - no need for complex loading strategies */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}