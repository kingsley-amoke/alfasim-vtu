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

const PaginationPage = ({currentPage, per_page}: {currentPage:string, per_page:string}) => {

  const router = useRouter()

  const {users } = useUsersStore()

  const start = (Number(currentPage) - 1) * (Number(per_page))
  const end = start + (Number(per_page))

  const hasNextPage = end < users.length
  const hasPreviousPage = start > 0

  return (
    <Pagination>
      <PaginationContent className="flex flex-row">
          <Button className="flex bg-teal-800 text-white mr-5" onClick={() =>router.push(`/?page=${Number(currentPage) - 1}&per_page=${per_page}`)} disabled={!hasPreviousPage}>
            Prev
          </Button>
        <PaginationItem>
          {currentPage}/{Math.ceil(10 / Number(per_page))}
        </PaginationItem>
        <Button className="flex bg-teal-800 text-white ml-5" onClick={()=>{router.push(`/?page=${Number(currentPage) + 1}&per_page=${per_page}`)}} disabled={!hasNextPage}>
            Next
          </Button>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
