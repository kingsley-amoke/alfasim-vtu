import { cn } from "../../lib/ui/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-teal-800", className)}
			{...props}
		/>
	);
}

export { Skeleton };

export function LoadingSkeleton() {
	return (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-10 md:h-20 w-10 md:w-20 rounded-full" />

			<Skeleton className="h-4 w-4 rounded-full" />
			<Skeleton className="h-4 w-4 rounded-full" />
			<Skeleton className="h-4 w-4 rounded-full" />
		</div>
	);
}
