import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="h-full w-full flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full rounded-b-none" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Skeleton className="h-5 w-4/5 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
}


export default function ProductListSkeleton() {
  // Show a grid of 9 skeletons to fill the space
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}