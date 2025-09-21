import CounterCard from "./CounterCard";
import LoadingIndicator from "./LoadingIndicator";
import { useCountdownTimer } from "../hooks/useCountdownTimer";

interface CountdownSectionProps {
  target: Date;
}

export default function CountdownSection({ target }: CountdownSectionProps) {
  const countdown = useCountdownTimer(target);

  return (
    <>
      {/* Enhanced countdown cards */}
      <div className="mt-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
        <div className="bounce-in delay-80 counter-card-rotate">
          <CounterCard
            value={String(countdown.days).padStart(2, "0")}
            label="Days"
            delay={80}
          />
        </div>
        <div className="bounce-in delay-160 counter-card-rotate">
          <CounterCard
            value={String(countdown.hours).padStart(2, "0")}
            label="Hours"
            delay={160}
          />
        </div>
        <div className="bounce-in delay-240 counter-card-rotate">
          <CounterCard
            value={String(countdown.minutes).padStart(2, "0")}
            label="Minutes"
            delay={240}
          />
        </div>
        <div className="bounce-in delay-320 counter-card-rotate">
          <CounterCard
            value={String(countdown.seconds).padStart(2, "0")}
            label="Seconds"
            delay={320}
          />
        </div>
      </div>

      {/* Enhanced launch date */}
      <div className="fade-in delay-400 mt-8">
        <p className="text-neutral-500 max-w-xl">
          Launching on{" "}
          <strong className="text-white tfont-bold">
            <time dateTime="2026-01-10">January 10, 2026</time>
          </strong>
        </p>

        {/* Loading indicator */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          <LoadingIndicator variant="dots" size="md" />
          <span className="text-white/60 text-sm">
            Preparing something amazing...
          </span>
        </div>
      </div>
    </>
  );
}
