import { Loader2, LoaderIcon } from "lucide-react";

export default function ({
  className,
  iconSize,
  type = 1,
}: {
  className?: string;
  iconSize?: number | string;
  type?: 1 | 2;
}) {
  return (
    <div className={`${className} w-fit`}>
      <div className={`animate-spin text-primary`}>
        {type === 1 ? (
          <Loader2 size={iconSize} />
        ) : (
          <LoaderIcon size={iconSize} />
        )}
      </div>
    </div>
  );
}
