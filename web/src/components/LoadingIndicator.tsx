interface LoadingIndicatorProps {
  variant?: "dots" | "spinner" | "pulse";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingIndicator({
  variant = "dots",
  size = "md",
  className = "",
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  if (variant === "dots") {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        <div
          className={`${sizeClasses[size]} bg-white/70 rounded-full loading-dots`}
        ></div>
        <div
          className={`${sizeClasses[size]} bg-white/70 rounded-full loading-dots`}
        ></div>
        <div
          className={`${sizeClasses[size]} bg-white/70 rounded-full loading-dots`}
        ></div>
      </div>
    );
  }

  if (variant === "spinner") {
    return (
      <div
        className={`${sizeClasses[size]} border-2 border-white/30 border-t-white rounded-full loading-spinner ${className}`}
      ></div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={`${sizeClasses[size]} bg-white/70 rounded-full loading-pulse ${className}`}
      ></div>
    );
  }

  return null;
}
