import LoadingSpinner from '@/components/ui/loading-spinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="text-center">
            <div className="h-8 bg-white/5 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-white/5 rounded w-1/4 mx-auto animate-pulse"></div>
          </div>

          {/* Featured image skeleton */}
          <div className="w-full h-64 bg-white/5 rounded-xl animate-pulse"></div>

          {/* Content skeleton */}
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-white/5 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
