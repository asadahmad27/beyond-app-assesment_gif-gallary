import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { NextUIProvider } from "@nextui-org/system";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ClientProvider from "./clientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gif Gallary",
  description: "Generated by create next app and Giphy API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <NextUIProvider>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </NextUIProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
