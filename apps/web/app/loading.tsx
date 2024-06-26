import { Loader } from "@repo/ui";

export default function Loading() {
  return (
    <div>
      <div className="grid place-content-center h-[60vh] w-full">
        <p className="text-xl">Loading...</p>
      </div>
      <div className="fixed inset-0 z-[100] bg-transparent backdrop-blur-sm flex justify-center items-center flex-col">
        <Loader iconSize={50} />
        GridBox getting ready🚀
      </div>
    </div>
  );
}
