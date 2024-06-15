import Image from "next/image";

export default function ({
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
      className={
        "relative overflow-hidden box-border" +
        (className ? ` ${className}` : "")
      }
    >
      <Image src={src} alt={alt} className="object-cover" fill />
      <svg
        viewBox="0 0 24 24"
        className="absolute right-0.5 bottom-0.5 rounded-full w-1/3 aspect-square bg-black"
      >
        <text x="8" y="18" className="fill-white">
          {quantity}
        </text>
      </svg>
    </div>
  );
}
