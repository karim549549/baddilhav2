interface CounterCardProps {
  value: string | number;
  label: string;
  delay?: number;
}

export default function CounterCard({
  value,
  label,
  delay = 0,
}: CounterCardProps) {
  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`${label} countdown`}
      className="w-full h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center rounded-2xl text-white bg-gradient-to-tr from-violet-800/80 to-pink-500/20 border-1 border-white/20 backdrop-blur-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-orbitron">
        {value}
      </div>
      <div className="text-xs sm:text-sm md:text-base mt-1 uppercase tracking-wider text-white/70">
        {label}
      </div>
    </div>
  );
}
