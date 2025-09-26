import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number into Nigerian Naira (NGN) currency.
 * @param amount The number to format.
 * @returns A string representing the amount in NGN, e.g., "₦45,000".
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",

    // We often don't display the kobo (cents) for cleaner prices
    // minimumFractionDigits: 0,
    // maximumFractionDigits: 2,
  }).format(amount);
}
