import { LoadingSkeleton } from "../components/Skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="h-screen w-full flex flex-col gap-5 justify-center items-center bg-teal-800/20  text-white">
      <p className="font-bold text-3xl">Loading...</p>
      <LoadingSkeleton />
    </div>
  );
}
