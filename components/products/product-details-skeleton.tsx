import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button skeleton */}
      <div className="inline-flex items-center text-blue-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <Skeleton className="aspect-square w-full rounded-lg" />

        {/* Details Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-1/3 my-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex items-center gap-4 pt-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-12 w-full mt-4" />
        </div>
      </div>
    </div>
  );
}