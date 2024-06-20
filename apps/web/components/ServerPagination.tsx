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

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalDataCount: number;
  pageLink: URL;
};

export default function ({
  currentPage,
  pageSize,
  totalDataCount,
  pageLink,
}: PaginationProps) {
  const fetchedDataCount = currentPage * pageSize;
  const totalPages = Math.ceil(totalDataCount / pageSize);

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const url = new URL(pageLink);
  return pageSize < totalDataCount ? (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${url.pathname}/${previousPage}${url.search}`}
            />
          </PaginationItem>
        )}
        {currentPage >= 3 && (
          <PaginationItem>
            <PaginationLink href={`${url.pathname}/1${url.search}`}>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href={`${url.pathname}/${previousPage}${url.search}`}
            >
              {previousPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            href={`${url.pathname}/${currentPage}${url.search}`}
            isActive={true}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {fetchedDataCount < totalDataCount && (
          <PaginationItem>
            <PaginationLink href={`${url.pathname}/${nextPage}${url.search}`}>
              {nextPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {nextPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={`${url.pathname}/${totalPages}${url.search}`}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        {fetchedDataCount < totalDataCount && (
          <PaginationItem>
            <PaginationNext href={`${url.pathname}/${nextPage}${url.search}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  ) : null;
}
