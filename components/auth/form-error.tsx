"use client"

import { AlertTriangle } from "lucide-react";

type FormErrorProps = {
  message?: string;
  errors?: string[] | null; // Add the optional errors array prop
};

export default function FormError({ message, errors }: FormErrorProps) {
  // If there's no main message AND no detailed errors, show nothing.
  if (!message && (!errors || errors.length === 0)) {
    return null;
  }

  return (
    <div className="bg-destructive/15 p-3 rounded-md text-sm text-destructive space-y-2">
      <div className="flex items-center gap-x-2 font-semibold">
        <AlertTriangle className="h-4 w-4" />
        <p>{message || "An error occurred"}</p>
      </div>
      
      {/* Conditionally render the list of detailed errors */}
      {errors && errors.length > 0 && (
        <ul className="list-disc list-inside pl-2">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}