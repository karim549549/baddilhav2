export default function Background() {
  return (
    <>
      {/* Enhanced background with multiple gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/30 to-pink-600/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-orange-500/10" />

      {/* Dynamic mouse-following gradient */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.3) 50%, transparent 70%)`,
          left: 200,
          top: 200,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-fast"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse-slow" />
      <div
        className="absolute top-40 right-32 w-3 h-3 bg-pink-400/60 rounded-full animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-16 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 right-20 w-4 h-4 bg-yellow-400/60 rounded-full animate-pulse-slow"
        style={{ animationDelay: "0.5s" }}
      />
    </>
  );
}
