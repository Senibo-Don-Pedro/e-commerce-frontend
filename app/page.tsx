import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Store</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. Quality guaranteed,
          fast shipping worldwide.
        </p>
        <Button asChild size={"lg"} variant={"default"} className="bg-white text-blue-600 hover:bg-gray-200 font-semibold transition duration-200">
          
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
}
