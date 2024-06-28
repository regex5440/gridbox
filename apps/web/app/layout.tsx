import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ProductCategory } from "@types";
import { Header, Footer, Search } from "../components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GridBox - Your one stop shop for all your needs",
  description:
    "GridBox e-commerce site created with NextJs+Turbo with love by hdxdev.in Harsh Dagar",
};

export default async function RootLayout({
  children,
  signin,
}: {
  children: React.ReactNode;
  signin?: React.ReactNode;
}): Promise<JSX.Element> {
  const categories = (await fetch(
    `${process.env.productAPI}/products/categories`
  ).then((res) => res.json())) as ProductCategory[] | null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header categories={categories || []} />
        <Search />
        {signin}
        {children}
        <Footer categories={(categories || []).slice(0, 12)} />
      </body>
    </html>
  );
}
