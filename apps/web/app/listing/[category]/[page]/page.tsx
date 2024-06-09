import { Product } from "@repo/ui/types";
import { ProductTemplate } from "../../../../components";
import { NextPageProps } from "../../../../@types";
import { Suspense } from "react";
import { Pagination as PgNation } from "@repo/ui";

const {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} = PgNation;

export default async function ListingPage({
  params: { category, page },
  searchParams,
}: NextPageProps) {
  //TODO: Implement listing based on URL params and path
  const url = new URL(
    `${process.env.productAPI}/products${category !== "all" ? `/category/${category}` : ""}`
  );
  const currentPage = Number(page);
  const size = Number(searchParams.size) || 20;
  url.searchParams.append("limit", String(size));
  url.searchParams.append("skip", String(size * (currentPage - 1)));

  //   for (const key in searchParams) {
  //     const value = searchParams[key];
  //     url.searchParams.append(key, value);
  //   }
  const data = await fetch(url.toString()).then((res) => res.json());
  const dataSize = data.limit;
  const dataTotal = data.total;
  const dataSkipped = data.skip;

  return (
    <div className="col-span-4 p-4">
      <h1 className="text-2xl mb-4">
        <span className="text-xl">Category:</span>{" "}
        <span className="capitalize">{category}</span>
      </h1>
      <div className="flex flex-wrap sm:justify-center max-sm:justify-evenly gap-x-4 gap-y-8 max-md:gap-x-2 max-md:gap-y-4">
        <Suspense fallback={<div>Loading...</div>}>
          {data.products?.map((product: Product) => (
            <ProductTemplate
              product={product}
              className="md:w-60 lg:h-auto max-sm:w-40 max-sm:flex-grow rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              key={product.id}
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
      {dataSize + dataSkipped <= dataTotal && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationPrevious href={String(currentPage - 1)} />
                </PaginationItem>
                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href={String(currentPage - 1)}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationLink href={String(currentPage)}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {dataSize + dataSkipped < dataTotal && (
              <>
                <PaginationItem>
                  <PaginationLink href={String(currentPage + 1)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
                {dataTotal - dataSkipped - 2 * dataSize > 0 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext href={String(currentPage + 1)} />
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
