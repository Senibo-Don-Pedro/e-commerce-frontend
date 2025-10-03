import { Order } from "@/types/order"; // Assuming your Order types are in `types/orders.ts`
import { formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type OrderCardProps = {
  order: Order; // We'll pass in a mock order object
};

// A helper to format the date nicely
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function OrderCard({ order }: OrderCardProps) {
  const placeholderImageUrl = (name: string) => `https://placehold.co/100x100/e2e8f0/64748b?text=${encodeURIComponent(name)}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{order.orderId.substring(0, 8)}</CardTitle>
            <CardDescription>Date: {formatDate(order.orderDate)}</CardDescription>
          </div>
          <Badge 
            variant={order.orderStatus === "PAID" ? "default" : "secondary"}
            className={order.orderStatus === "PAID" ? "bg-green-600" : ""}
          >
            {order.orderStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              View {order.items.length} item(s)
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl || placeholderImageUrl(item.productName)}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-sm">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} x {formatCurrency(item.pricePerUnit)}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      {formatCurrency(item.quantity * item.pricePerUnit)}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-end font-bold text-lg">
        Order Total: {formatCurrency(order.totalAmount)}
      </CardFooter>
    </Card>
  );
}