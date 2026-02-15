export function SpotSkeleton() {
    return (
        <div className="glass flex flex-col overflow-hidden rounded-xl animate-pulse">
            {/* Image skeleton */}
            <div className="relative aspect-[4/3] bg-secondary/50" />

            {/* Content skeleton */}
            <div className="flex flex-col gap-3 p-4">
                <div className="h-4 w-3/4 rounded bg-secondary/50" />
                <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-secondary/30" />
                    <div className="h-3 w-5/6 rounded bg-secondary/30" />
                </div>
                <div className="mt-auto flex gap-1.5">
                    <div className="h-5 w-16 rounded-md bg-secondary/30" />
                    <div className="h-5 w-12 rounded-md bg-secondary/30" />
                </div>
            </div>
        </div>
    )
}
