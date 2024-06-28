import Image from "next/image";

export default function ProductImage({
  src,
  alt,
  quantity,
  className,
}: {
  src: string;
  alt: string;
  quantity: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden box-border${
        className ? ` ${className}` : ""
      }`}
    >
      <Image alt={alt} className="object-cover" fill src={src} />
      <svg
        className="absolute right-0.5 bottom-0.5 rounded-full w-1/3 aspect-square bg-black"
        viewBox="0 0 24 24"
      >
        <text className="fill-white" x="8" y="18">
          {quantity}
        </text>
      </svg>
    </div>
  );
}
