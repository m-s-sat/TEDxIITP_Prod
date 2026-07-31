export default function SpeakersSkeleton() {
  return (
    <div 
      className="flex flex-row items-center w-full h-full animate-pulse gap-0 pl-[calc(50%-40vw)] sm:pl-[calc(50%-200px)] pr-[calc(50%-200px)]"
    >    
      <div className="snap-center flex-shrink-0">
        <div 
          className="relative rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700/50 
            w-[80vw] h-[350px] 
            sm:w-[400px] sm:h-[400px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 h-7 w-48 rounded-md bg-zinc-700/60" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-9 w-32 rounded-full bg-zinc-700" />
        </div>
      </div>
      {[1, 2, 3].map((index) => (
        <div key={index} className="snap-center flex-shrink-0">
          <div 
            className="relative bg-zinc-900 border border-zinc-800/80 overflow-hidden opacity-50 w-[55vw] h-[220px] sm:w-[250px] sm:h-[250px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 h-4 w-32 rounded-md bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}