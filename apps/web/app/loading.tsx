import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div>
      <div className="grid place-content-center h-[60vh] w-full">
        <p className="text-xl">Loading...</p>
      </div>
      <div className="fixed inset-0 z-[100] bg-transparent backdrop-blur-sm flex justify-center items-center flex-col">
        <div className="animate-spin">
          <Loader2 className="stroke-primary" size="50" />
        </div>
        GridBox getting ready🚀
      </div>
    </div>
  );
}
