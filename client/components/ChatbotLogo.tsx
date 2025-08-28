import React from "react";

interface ChatbotLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ChatbotLogo({ size = "md", className = "" }: ChatbotLogoProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer ring with gradient */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#gradient)"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.1"
        />
        
        {/* Main robot head */}
        <rect
          x="8"
          y="12"
          width="24"
          height="20"
          rx="6"
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Antenna */}
        <circle
          cx="20"
          cy="8"
          r="2"
          fill="currentColor"
          opacity="0.7"
        />
        <line
          x1="20"
          y1="10"
          x2="20"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* Eyes */}
        <circle
          cx="15"
          cy="19"
          r="2.5"
          fill="white"
          opacity="0.9"
        />
        <circle
          cx="25"
          cy="19"
          r="2.5"
          fill="white"
          opacity="0.9"
        />
        
        {/* Eye pupils */}
        <circle
          cx="15"
          cy="19"
          r="1"
          fill="currentColor"
          opacity="0.6"
        />
        <circle
          cx="25"
          cy="19"
          r="1"
          fill="currentColor"
          opacity="0.6"
        />
        
        {/* Smile */}
        <path
          d="M 16 25 Q 20 28 24 25"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Chat bubble indicator */}
        <circle
          cx="32"
          cy="16"
          r="4"
          fill="currentColor"
          opacity="0.3"
        />
        <circle
          cx="34"
          cy="18"
          r="1.5"
          fill="currentColor"
          opacity="0.4"
        />
        <circle
          cx="30"
          cy="18"
          r="1"
          fill="currentColor"
          opacity="0.4"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Alternative modern geometric design
export function ChatbotLogoGeometric({ size = "md", className = "" }: ChatbotLogoProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background hexagon */}
        <path
          d="M16 2 L26 8 L26 24 L16 30 L6 24 L6 8 Z"
          fill="currentColor"
          opacity="0.1"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        
        {/* Main face rectangle */}
        <rect
          x="9"
          y="10"
          width="14"
          height="12"
          rx="3"
          fill="currentColor"
          opacity="0.8"
        />
        
        {/* Top connection */}
        <rect
          x="15"
          y="6"
          width="2"
          height="4"
          fill="currentColor"
          opacity="0.6"
        />
        <circle
          cx="16"
          cy="6"
          r="1.5"
          fill="currentColor"
          opacity="0.7"
        />
        
        {/* Eyes - modern dots */}
        <circle
          cx="13"
          cy="14"
          r="1.5"
          fill="white"
          opacity="0.9"
        />
        <circle
          cx="19"
          cy="14"
          r="1.5"
          fill="white"
          opacity="0.9"
        />
        
        {/* Eye glow effect */}
        <circle
          cx="13"
          cy="14"
          r="0.5"
          fill="currentColor"
          opacity="0.6"
        />
        <circle
          cx="19"
          cy="14"
          r="0.5"
          fill="currentColor"
          opacity="0.6"
        />
        
        {/* Modern mouth - line */}
        <rect
          x="13"
          y="18"
          width="6"
          height="1"
          rx="0.5"
          fill="white"
          opacity="0.8"
        />
        
        {/* Side communication indicators */}
        <circle cx="26" cy="12" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="28" cy="14" r="0.5" fill="currentColor" opacity="0.3" />
        <circle cx="24" cy="16" r="0.5" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
}
