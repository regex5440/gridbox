import { Loader2, LoaderIcon } from "lucide-react";
import { cn } from "../utils";

export default function Loader({
  className,
  iconSize,
  type = 1,
}: {
  className?: string;
  iconSize?: number | string;
  type?: 1 | 2;
}) {
  return (
    <div className={cn(`text-primary w-fit`, className)}>
      <div className="animate-spin">
        {type === 1 ? (
          <Loader2 size={iconSize} />
        ) : (
          <LoaderIcon size={iconSize} />
        )}
      </div>
    </div>
  );
}
