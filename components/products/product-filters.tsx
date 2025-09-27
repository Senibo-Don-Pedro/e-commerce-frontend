"use client";

import { useState, FormEvent, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/types/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter as FilterIcon, Search as SearchIcon } from "lucide-react";

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // --- LOCAL STATE FOR ALL FILTERS ---
  // We initialize the state with the current values from the URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || "10");

  // State to manage the Sheet's open/closed status for mobile
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Build the query string from our local state
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (category !== "all") params.set("category", category);
    if (sortBy) params.set("sortBy", sortBy);
    if (pageSize) params.set("pageSize", pageSize);

    // No need to delete 'page', as it's not included unless we add it
    router.push(`${pathname}?${params.toString()}`);
    setIsSheetOpen(false); // Close the sheet on mobile after applying
  };

  // --- CLEAR FILTERS HANDLER ---
  const handleClearFilters = () => {
    // 1. Reset all local state to defaults
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCategory("all");
    setSortBy("createdAt");
    setPageSize("10");

    // 2. Navigate to the clean URL
    router.push(pathname);
    setIsSheetOpen(false); // Close the sheet on mobile
  };

  // The actual filter form JSX
  const filterForm = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Search Input */}
      <div>
        <h3 className="font-semibold mb-2">Search</h3>
        <Input
          placeholder="Product name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2">Price Range (NGN)</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Category Select Dropdown */}
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue/></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {PRODUCT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat.replace(/_/g, " ")}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort By and Page Size */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Sort By</h3>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Per Page</h3>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-4 border-t">
        <Button type="submit" className="w-full">Apply Filters</Button>
        <Button type="button" variant="ghost" className="w-full" onClick={handleClearFilters}>Clear All</Button>
      </div>
    </form>
  );

  return (
    <>
      {/* Mobile View: A "Show Filters" button that opens a Sheet */}
      <div className="lg:hidden mb-4">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <FilterIcon className="h-4 w-4 mr-2"/>
              Show Filters & Sort
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Filters & Sort</SheetTitle></SheetHeader>
            <div className="mt-4">{filterForm}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View: A persistent sidebar */}
      <aside className="hidden lg:block">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        {filterForm}
      </aside>
    </>
  );
}