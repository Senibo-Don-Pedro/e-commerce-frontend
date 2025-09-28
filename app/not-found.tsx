
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-4">
      <FileQuestion className="h-24 w-24 text-gray-300 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </div>
  );
}