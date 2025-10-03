"use client";

import { useState, FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter as FilterIcon } from "lucide-react";

// The available order statuses for filtering
const ORDER_STATUSES = ["PENDING", "PAID", "SHIPPED", "CANCELLED"] as const;

export default function OrderFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // --- LOCAL STATE FOR FILTERS ---
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortDirection, setSortDirection] = useState(searchParams.get("sortDirection") || "desc");
  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || "10");

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Build the query string from our local state
    if (status !== "all") params.set("status", status);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortDirection) params.set("sortDirection", sortDirection);
    if (pageSize) params.set("pageSize", pageSize);

    router.push(`${pathname}?${params.toString()}`);
    setIsSheetOpen(false); // Close the sheet on mobile
  };

  // --- CLEAR FILTERS HANDLER ---
  const handleClearFilters = () => {
    setStatus("all");
    setSortBy("createdAt");
    setSortDirection("desc");
    setPageSize("10");
    router.push(pathname);
    setIsSheetOpen(false);
  };

  // The actual filter form JSX
  const filterForm = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Filter by Status */}
      <div>
        <h3 className="font-semibold mb-2">Filter by Status</h3>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue/></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
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
              <SelectItem value="totalAmount">Total Amount</SelectItem>
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
        <Button type="submit" className="w-full">Apply</Button>
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
              Filter & Sort Orders
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