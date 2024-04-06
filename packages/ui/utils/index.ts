import { ClassNameValue, twMerge } from "tailwind-merge";

function cn(...classes: (string | undefined | boolean)[]): string {
  return twMerge(...(classes.filter(Boolean) as ClassNameValue[]));
}

export { cn };
export * from "./enums";
