import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple className values using clsx and merges the resulting Tailwind classes with twMerge
 * to prevent class conflicts and ensure proper specificity
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 