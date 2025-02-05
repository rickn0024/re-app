import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Convert Prisma object into a plain JavaScript object
export function convertToPlainObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// Format number with decimal places
export function formatNumberWithDecimal(value: number): string {
  const [int, decimal] = value.toString().split('.');

  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int;
}
