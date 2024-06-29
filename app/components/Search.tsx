"use client";

import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {useDebouncedCallback} from 'use-debounce'

const Search = ({ placeholder }: { placeholder: string }) => {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if(term) {
        params.set("query", term)
    }else{
        params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0 m-2 md-m-5 md:justify-start">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full md:w-1/3  rounded-md border border-gray-200 py[-9px] pl-10 text-sm outline-2 placeholder:text-gray-500 py-2"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <FaMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 "/>
    </div>
  );
};

export default Search;
