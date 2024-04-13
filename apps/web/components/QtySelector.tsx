"use client";
import { Button } from "@repo/ui";
import { useState } from "react";

export default function QtySelector({
  initialCount,
}: {
  initialCount?: number;
}) {
  const [count, setCount] = useState(initialCount || 1);

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
        className="border h-8 aspect-square text-3xl"
        title="Decrease quantity"
      >
        -
      </Button>
      <span className="w-6">{count}</span>
      <Button
        onClick={() => setCount(Math.min(30, count + 1))}
        type="button"
        className="border h-8 aspect-square text-3xl"
        title="Increase quantity"
      >
        +
      </Button>
    </div>
  );
}
