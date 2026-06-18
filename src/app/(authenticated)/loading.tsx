import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48 bg-gray-800" />
        <Skeleton className="h-4 w-72 bg-gray-900" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full bg-gray-900 rounded-xl" />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-64 w-full bg-gray-900 rounded-xl" />
        <Skeleton className="h-64 w-full bg-gray-900 rounded-xl" />
      </div>
    </div>
  )
}
