import type { Product } from "@repo/ui/types";
import { Suspense } from "react";
import { Loader } from "@repo/ui";
import ServerPagination from "@components/ServerPagination";
import SiteMap from "@utils/sitemap";
import { ProductTemplate } from "../../../../components";
import { Metadata } from "next";

type ListingPageProps = {
  params: { category: string; page: string };
  searchParams: { size?: string };
};

export default async function ListingPage({
  params: { category, page },
  searchParams,
}: ListingPageProps) {
  const url = new URL(
    `${process.env.productAPI}/products${category !== "all" ? `/category/${category}` : ""}`
  );
  const currentPage = Number(page);
  const size = Number(searchParams.size) || 20;
  url.searchParams.append("limit", String(size));
  url.searchParams.append("skip", String(size * (currentPage - 1)));

  const data = (await fetch(url.toString()).then((res) => res.json())) as {
    products: Product[];
    limit: number;
    total: number;
  };
  const dataSize = data.limit;
  const dataTotal = data.total;

  return (
    <div className="col-span-4 p-4">
      <h1 className="text-2xl mb-4">
        <span className="text-xl">Category:</span>{" "}
        <span className="capitalize">{category}</span>
      </h1>
      <div className="flex flex-wrap sm:justify-center max-sm:justify-evenly gap-x-4 gap-y-8 max-md:gap-x-2 max-md:gap-y-4">
        <Suspense fallback={<Loader className="mx-auto mt-6" />}>
          {data.products?.map((product: Product) => (
            <ProductTemplate
              className="md:w-60 lg:h-auto max-sm:w-40 max-sm:flex-grow rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              key={product.id}
              product={product}
            />
          ))}
        </Suspense>
      </div>
      <div
        className="text-center text-gray-400 mt-8 fieldset-legend"
        style={{ "--char-length": "20ch" } as React.CSSProperties}
      >
        Showing {dataSize} results
      </div>
      <ServerPagination
        currentPage={currentPage}
        pageLink={
          new URL(
            `${SiteMap.PLP.CategoryWise.path}/${category}`,
            process.env.ASSIGNED_URL
          )
        }
        pageSize={size}
        totalDataCount={dataTotal}
      />
    </div>
  );
}

export async function generateMetadata({
  params: { category },
}: {
  params: { category: string; page: string };
}): Promise<Metadata> {
  return {
    title: `${category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} - GridBox`,
    description: `View all ${category.replace(/\-/g, " ")} products on GridBox e-commerce site`,
  };
}
