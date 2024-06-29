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
import { userDataTypes } from "@/lib/types";

const PaginationPage = ({
  users,
  currentPage,
  per_page,
}: {
  users:userDataTypes[];
  currentPage: string;
  per_page: string;
}) => {
  const router = useRouter();

  const { users } = useUsersStore();

  const start = (Number(currentPage) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const hasNextPage = end < users.length;
  const hasPreviousPage = start > 0;

  const disabledPrev = !hasPreviousPage ? 'bg-gray-500' : ' bg-teal-800'
  const disabledNext = !hasNextPage ? 'bg-gray-500' : ' bg-teal-800'

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
            className={ ` ${disabledPrev} flex text-white mr-5 py-2 px-5 justify-center items-center rounded-md`}
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
            className={` ${disabledNext} flex bg-teal-800 text-white ml-5 py-2 px-5 justify-center items-center rounded-md`}
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
