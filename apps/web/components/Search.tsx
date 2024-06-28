"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader2, SearchIcon, X } from "lucide-react";
import { Button, Input } from "@repo/ui";
import type { Product } from "@repo/ui/types";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@hooks/index";
import SiteMap from "@utils/sitemap";

export default function Search(): React.ReactNode {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const requestSignal = useRef<AbortController | null>(null);
  const searchGroup = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.onmousedown = (e) => {
      if (!searchGroup.current?.contains(e.target as Node)) {
        setShowDialog(false);
      }
    };
    return () => {
      document.onmousedown = null;
    };
  }, []);

  const curateSearchResults = useDebounce((query = "") => {
    try {
      requestSignal.current?.abort("duplicate");
      if (!query) throw new Error("Empty query");
      setLoading(true);
      requestSignal.current = new AbortController();
      fetch(`/api/products/search?q=${encodeURIComponent(query as string)}`, {
        signal: requestSignal.current.signal,
      })
        .then((res) => res.json())
        .then((data: { products: Product[] }) => {
          setSearchResults(data.products);
          setLoading(false);
        })
        .finally(() => setShowDialog(true));
    } catch (e) {
      if ((query as string).length === 0) {
        setLoading(false);
      }
    }
  }, 500);

  const handleInput = (value: string) => {
    curateSearchResults(value.trim());
    setSearchQuery(value);
    if (value.length === 0) setSearchResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(e.target.value);
  };

  return (
    <div className="sticky top-0 px-common-x py-2 z-[49] bg-surface shadow-md">
      <div className="flex" ref={searchGroup}>
        <div className="w-1/12 grid place-content-center md:bg-surface-secondary rounded-tl-md rounded-bl-md border border-r-0">
          <SearchIcon className="max-md:w-4 max-md:h-4 text-primary" />
        </div>
        <div className="relative flex-auto">
          <Input
            className="md:pl-10 rounded-br-md rounded-tr-md pr-10 max-md:pl-5 md:border max-md:border-l-0"
            onChange={handleInputChange}
            onFocus={() => searchQuery.length > 0 && setShowDialog(true)}
            placeholder="Search"
            type="text"
            value={searchQuery}
          />
          <div className="absolute right-0 top-0 h-full w-10 grid place-content-center">
            {loading ? <Loader2 className="animate-spin" /> : null}
            {searchQuery.length > 0 && !loading && (
              <Button
                className="h-full w-full box-border p-0"
                onClick={() => {
                  setShowDialog(false);
                  handleInput("");
                }}
                variant="link"
              >
                <X />
              </Button>
            )}
          </div>
          <div
            className="absolute w-full bottom-0 left-0 bg-surface translate-y-full transition-[height] duration-700 ease-in-out data-[fill=true]:h-[50vh] p-2 rounded-b-lg drop-shadow-2xl hidden data-[visible=true]:block overflow-y-auto"
            data-fill={searchResults.length > 0}
            data-visible={showDialog}
          >
            {searchResults.length > 0 && (
              <div className="text-sm italic text-ternary">
                Search Results for: {searchQuery}
              </div>
            )}
            {searchResults.length === 0 && searchQuery.length > 0 && (
              <div className="text-center grid place-content-center h-1/2 mt-4">
                <div className="text-xl text-ternary">No results found</div>
              </div>
            )}
            <div className="w-full">
              {searchResults.map(
                (product: Pick<Product, "title" | "id" | "thumbnail">) => (
                  <Link
                    className="flex hover:bg-surface-secondary cursor-pointer items-center gap-2"
                    href={`${SiteMap.PDP.path}/${product.id}`}
                    key={product.id}
                    onClick={() => {
                      setShowDialog(false);
                    }}
                  >
                    <div>
                      <Image
                        alt={product.title}
                        height={50}
                        src={product.thumbnail}
                        width={50}
                      />
                    </div>
                    <div className="whitespace-nowrap overflow-x-hidden text-ellipsis">
                      {product.title}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
