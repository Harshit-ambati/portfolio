export default function SectionSkeleton({ title, cards = 3, compact = false }) {
  const skeletonCards = Array.from({ length: cards }, (_, index) => index);

  return (
    <section className="px-5 pb-8 md:px-8">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="mt-3 h-8 w-40 animate-pulse rounded-full bg-white/10" />
          </div>
          <div className="h-9 w-32 animate-pulse rounded-full bg-white/10" />
        </div>

        <div className={compact ? "grid gap-5 md:grid-cols-2" : "grid gap-5 lg:grid-cols-3 xl:grid-cols-3"}>
          {skeletonCards.map((card) => (
            <div
              key={`${title}-${card}`}
              className="rounded-[24px] border border-white/10 bg-black/30 p-5"
            >
              <div className="h-3 w-20 animate-pulse rounded-full bg-white/10" />
              <div className="mt-4 h-7 w-3/4 animate-pulse rounded-full bg-white/10" />
              <div className="mt-6 space-y-3">
                <div className="h-3 animate-pulse rounded-full bg-white/10" />
                <div className="h-3 animate-pulse rounded-full bg-white/10" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
              </div>
              <div className="mt-6 h-10 w-32 animate-pulse rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
