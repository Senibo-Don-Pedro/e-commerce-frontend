"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  hasNext: boolean;
  hasPrev: boolean;
};

export default function PaginationControls({
  hasNext,
  hasPrev,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 0;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrev}
        variant="outline"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <span className="font-semibold">Page {currentPage + 1}</span>

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
        variant="outline"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
