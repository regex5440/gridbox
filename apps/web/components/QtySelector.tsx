"use client";
import { Select as Sel } from "@repo/ui";
import React, { HTMLAttributes } from "react";

const {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} = Sel;

type QtySelectorProps = {
  count: number;
  onChange: (count: number) => void;
  triggerClassName?: HTMLAttributes<HTMLButtonElement>["className"];
  optionClassName?: HTMLAttributes<HTMLDivElement>["className"];
};

export default function QtySelector({
  count,
  onChange,
  triggerClassName,
  optionClassName,
}: QtySelectorProps) {
  const MAX_QUANTITY = 10;
  return (
    <Select
      onValueChange={(strVal) => onChange?.(Number(strVal))}
      defaultValue={String(count)}
      name="quantity"
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={count} />
      </SelectTrigger>
      <SelectContent className="bg-surface min-w-10 px-0">
        {[...Array(MAX_QUANTITY)].map((_, i) => (
          <React.Fragment key={i}>
            <SelectItem
              value={String(i + 1)}
              className={
                "justify-center data-[state=checked]:bg-surface-inverted data-[state=checked]:text-regular-inverted hover:bg-surface-dark cursor-pointer " +
                optionClassName
              }
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
