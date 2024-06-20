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
  pageLink: string;
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

  return pageSize < totalDataCount ? (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${pageLink}/${previousPage}`} />
          </PaginationItem>
        )}
        {currentPage >= 3 && (
          <PaginationItem>
            <PaginationLink href={`${pageLink}/1`}>1</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`${pageLink}/${previousPage}`}>
              {previousPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={`${pageLink}/${currentPage}`} isActive={true}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {fetchedDataCount < totalDataCount && (
          <PaginationItem>
            <PaginationLink href={`${pageLink}/${nextPage}`}>
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
            <PaginationLink href={`${pageLink}/${totalPages}`}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        {fetchedDataCount < totalDataCount && (
          <PaginationItem>
            <PaginationNext href={`${pageLink}/${nextPage}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  ) : null;
}
