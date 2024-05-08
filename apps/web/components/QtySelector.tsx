"use client";
import { Button } from "@repo/ui";
import { Minus, Plus } from "lucide-react";
import { HTMLAttributes } from "react";

type QtySelectorProps = {
  count: number;
  onChange: (count: number) => void;
  buttonClassName?: HTMLAttributes<HTMLButtonElement>["className"];
  countClassName?: HTMLAttributes<HTMLSpanElement>["className"];
};

export default function QtySelector({
  count,
  onChange,
  buttonClassName,
  countClassName,
}: QtySelectorProps) {
  const setCount = (qty: number) => {
    onChange?.(qty);
  };

  return (
    <div className="text-xl flex gap-1 items-center">
      <input
        type="number"
        value={count}
        min={1}
        max={30}
        name="quantity"
        hidden
        readOnly
      />
      <Button
        onClick={() => setCount(Math.max(1, count - 1))}
        type="button"
        className={buttonClassName}
        title="Decrease quantity"
      >
        <Minus />
      </Button>
      <span className={countClassName}>{count}</span>
      <Button
        onClick={() => setCount(Math.min(30, count + 1))}
        type="button"
        className={buttonClassName}
        title="Increase quantity"
      >
        <Plus />
      </Button>
    </div>
  );
}
