import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-[40vh] grid place-content-center text-center">
      <h1 className="text-xl">Oops! This page does not exists</h1>
      <Link className="underline text-primary" href="/">
        Go to Homepage
      </Link>
    </div>
  );
}
