import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from ".";

export default function Search(): React.ReactNode {
  return (
    <div className="sticky top-0 px-common-x py-2 z-10">
      <div className="flex">
        <div className="w-1/12 grid place-content-center bg-slate-400 rounded-tl-[0.375rem] rounded-bl-[0.375rem]">
          <SearchIcon />
        </div>
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 rounded-tl-none rounded-bl-none"
        />
      </div>
    </div>
  );
}
