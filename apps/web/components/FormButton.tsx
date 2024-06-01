"use client";
import { Button } from "@repo/ui";
import { LoaderCircle } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { useFormStatus } from "react-dom";

export default forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function FormButton({ children, ...props }, ref) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      data-pending={pending}
      ref={ref}
      children={pending ? <LoaderCircle className="animate-spin" /> : children}
    />
  );
});
