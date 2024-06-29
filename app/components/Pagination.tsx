import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/lib/ui/pagination";

const PaginationPage = ({currentPage, per_page}: {currentPage:string, per_page:string}) => {
  return (
    <Pagination>
      <PaginationContent className="flex flex-row">
        <PaginationItem>
          <PaginationPrevious href={`/admin?page=${Number(currentPage) - 1}&per_page=${per_page}`} className="flex bg-teal-800 text-white mr-5"/>
        </PaginationItem>
        <PaginationItem>
          {currentPage}/{Math.ceil(10 / Number(per_page))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`/admin?page=${Number(currentPage) + 1}&per_page=${per_page}`} className="flex bg-teal-800 text-white ml-5"/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
