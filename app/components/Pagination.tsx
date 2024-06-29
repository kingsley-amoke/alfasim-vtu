import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/lib/ui/pagination";
import { useUsersStore } from "@/lib/store";
import Button from "./Button";
import { useRouter } from "next/navigation";

const PaginationPage = ({
  currentPage,
  per_page,
}: {
  currentPage: string;
  per_page: string;
}) => {
  const router = useRouter();

  const { users } = useUsersStore();

  const start = (Number(currentPage) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const hasNextPage = end < users.length;
  const hasPreviousPage = start > 0;

  const handleNextPage = () => {
    router.push(`/admin?page=${Number(currentPage) + 1}&per_page=${per_page}`);
  };

  const handlePreviousPage = () => {
    router.push(`/admin?page=${Number(currentPage) - 1}&per_page=${per_page}`);
  };

  return (
    <Pagination>
      <PaginationContent className="flex flex-row">
        <PaginationItem>
          <button
            className="flex bg-teal-800 text-white mr-5 py-2 px-3 justify-center items-center"
            disabled={!hasPreviousPage}
            onClick={() => handlePreviousPage()}
          >
            Prev
          </button>
        </PaginationItem>
        <PaginationItem>
          {currentPage}/{Math.ceil(10 / Number(per_page))}
        </PaginationItem>
        <PaginationItem>
          <button
            className="flex bg-teal-800 text-white ml-5 py-2 px-3 justify-center items-center"
            disabled={!hasNextPage}
            onClick={() => handleNextPage()}
          >
            Next
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
