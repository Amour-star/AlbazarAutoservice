import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../app/components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salim Carage",
  description: "Salim Carage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-yellow-600 dark:bg-black dark:text-yellow-400">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
