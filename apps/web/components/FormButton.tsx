"use client";
import { Button } from "@repo/ui";
import { HTMLAttributes, forwardRef } from "react";
import { useFormStatus } from "react-dom";

export default forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  function FormButton({ ...props }, ref) {
    const { pending } = useFormStatus();
    return <Button {...props} data-pending={pending} ref={ref} />;
  }
);
