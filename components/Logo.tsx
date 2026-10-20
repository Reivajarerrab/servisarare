import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  // Dimensions for the icon
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem SVG Badge */}
      <div
        className={`${iconDimensions} relative rounded-2xl bg-linear-to-br from-emerald-600 via-emerald-800 to-slate-950 p-1.5 shadow-lg shadow-emerald-900/20 flex items-center justify-center border border-amber-400/40 shrink-0 group-hover:scale-105 transition-transform`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Llanos Sun / Mountain Silhouette */}
          <circle cx="50" cy="50" r="42" fill="url(#sun-grad)" opacity="0.25" />
          <path
            d="M15 72 C30 55, 45 62, 60 52 C75 42, 85 58, 90 72 Z"
            fill="url(#mountain-grad)"
            opacity="0.35"
          />

          {/* Roof / House of Services Frame */}
          <path
            d="M50 14 L84 42 L76 48 L50 27 L24 48 L16 42 Z"
            fill="url(#gold-grad)"
          />

          {/* Crossed Wrench / Hammer Stylized Craft Tools */}
          <path
            d="M36 68 L64 40 M40 72 L68 44"
            stroke="#FDE047"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Center Dynamic Energy Lightning / Spark */}
          <path
            d="M54 26 L36 54 L49 54 L44 80 L66 48 L52 48 Z"
            fill="url(#gold-grad)"
            filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="sun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="mountain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small Golden Corner Spark */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-white"></span>
        </span>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-2xl tracking-tight text-slate-900 leading-none">
              Servi<span className="text-emerald-700">Sarare</span>
            </span>
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-emerald-300">
              Arauca
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
            Directorio del Sarare • Trabajo de Confianza
          </p>
        </div>
      )}
    </div>
  );
}
