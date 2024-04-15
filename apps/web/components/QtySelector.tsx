"use client";
import { Button } from "@repo/ui";
import { Minus, Plus } from "lucide-react";
import { HTMLAttributes, useState } from "react";

type QtySelectorProps = {
  initialCount?: number;
  onChange?: (count: number) => void;
  buttonHeight?: number; //Tailwind CSS height value
};

export default function QtySelector({
  initialCount,
  onChange,
  buttonHeight,
}: QtySelectorProps) {
  const [count, setQty] = useState(initialCount || 1);

  const setCount = (qty: number) => {
    setQty(qty);
    onChange?.(qty);
  };

  return (
    <div className="text-xl flex gap-1 items-center">
      <input
        type="number"
        value={count}
        min={1}
        max={30}
        name="qty"
        hidden
        readOnly
      />
      <Button
        onClick={() => setCount(Math.max(1, count - 1))}
        type="button"
        className={`border h-${buttonHeight || 8} aspect-square p-1`}
        title="Decrease quantity"
      >
        <Minus />
      </Button>
      <span className="w-6 text-center">{count}</span>
      <Button
        onClick={() => setCount(Math.min(30, count + 1))}
        type="button"
        className={`border h-${buttonHeight || 8} aspect-square p-1`}
        title="Increase quantity"
      >
        <Plus />
      </Button>
    </div>
  );
}
