"use client";
import { Select as Sel } from "@repo/ui";
import type { HTMLAttributes } from "react";
import React, { useState } from "react";

const { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } = Sel;

type QtySelectorProps = {
  count: number;
  onChange: (count: number) => void;
  triggerClassName?: HTMLAttributes<HTMLButtonElement>["className"];
  optionClassName?: HTMLAttributes<HTMLDivElement>["className"];
};

const MAX_QUANTITY = 10;
export default function QtySelector({
  count: initialCount = 1,
  onChange,
  triggerClassName,
  optionClassName,
}: QtySelectorProps) {
  const [count, setCount] = useState(initialCount);
  const qtyChangeHandler = (strVal: string) => {
    const qty = Number(strVal);
    setCount(qty);
    onChange(qty);
  };
  return (
    <Select
      defaultValue={String(count)}
      name="quantity"
      onValueChange={qtyChangeHandler}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={count} />
      </SelectTrigger>
      <SelectContent className="bg-surface min-w-10 px-0">
        {Array(MAX_QUANTITY)
          .fill(0)
          .map((_, i) => (
            <React.Fragment key={i}>
              <SelectItem
                className={`justify-center data-[state=checked]:bg-surface-inverted data-[state=checked]:text-regular-inverted hover:bg-surface-dark cursor-pointer ${
                  optionClassName
                }`}
                value={String(i + 1)}
                withIndicator={false}
              >
                {i + 1}
              </SelectItem>
            </React.Fragment>
          ))}
      </SelectContent>
    </Select>
    // <div className="text-xl flex gap-1 items-center">
    //   <input
    //     type="number"
    //     value={count}
    //     min={1}
    //     max={30}
    //     name="quantity"
    //     hidden
    //     readOnly
    //   />
    //   <Button
    //     onClick={() => setCount(Math.max(1, count - 1))}
    //     type="button"
    //     className={buttonClassName}
    //     title="Decrease quantity"
    //   >
    //     <Minus />
    //   </Button>
    //   <span className={countClassName}>{count}</span>
    //   <Button
    //     onClick={() => setCount(Math.min(30, count + 1))}
    //     type="button"
    //     className={buttonClassName}
    //     title="Increase quantity"
    //   >
    //     <Plus />
    //   </Button>
    // </div>
  );
}
