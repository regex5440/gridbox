import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer, Search } from "../components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GridBox - Your one stop shop for all your needs",
  description:
    "GridBox e-commerce site created with NextJs+Turbo with love by hdxdev.in Harsh Dagar",
};

export default function RootLayout({
  children,
  signin,
}: {
  children: React.ReactNode;
  signin?: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Search />
        {signin}
        {children}
        <Footer />
      </body>
    </html>
  );
}
