import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from ".";

export default function Search(): React.ReactNode {
  return (
    <div className="sticky top-0 px-8 py-2">
      <div className="relative">
        <span className="w-10 absolute left-0 top-1/2 -translate-y-1/2 grid place-content-center">
          <SearchIcon />
        </span>
        <Input type="text" placeholder="Search" className="pl-10" />
      </div>
    </div>
  );
}
