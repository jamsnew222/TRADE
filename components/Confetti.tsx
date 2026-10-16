'use client';

import { useMemo } from 'react';

interface ConfettiProps {
  /** rain = full-screen falling celebration (lesson complete);
      burst = small radial pop (correct answer) */
  mode?: 'rain' | 'burst';
  count?: number;
}

const COLORS = ['#22C55E', '#FBBF24', '#3B82F6', '#EF4444', '#A855F7', '#F97316'];

/** CSS-only confetti — pieces carry their trajectory in CSS vars, the
 *  keyframes live in globals.css. pointer-events-none, aria-hidden. */
export default function Confetti({ mode = 'rain', count = 28 }: ConfettiProps) {
  const pieces = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const rand = (a: number, b: number) => a + ((i * 2654435761) % 1000) / 1000 * (b - a);
      if (mode === 'rain') {
        return {
          left: `${rand(2, 98)}%`,
          top: '-4%',
          '--dx': '0px',
          '--dy': '0px',
          '--rot': `${rand(360, 900)}deg`,
          '--dur': `${rand(2.4, 4.2)}s`,
          '--delay': `${rand(0, 1.4)}s`,
          '--c': COLORS[i % COLORS.length],
          '--w': `${rand(6, 10)}px`,
          '--h': `${rand(10, 16)}px`,
          '--r': `${rand(0, 360)}deg`,
        } as React.CSSProperties;
      }
      const angle = rand(0, Math.PI * 2);
      const dist = rand(60, 130);
      return {
        left: '50%',
        top: '50%',
        '--dx': `${Math.cos(angle) * dist}px`,
        '--dy': `${Math.sin(angle) * dist - 30}px`,
        '--rot': `${rand(180, 720)}deg`,
        '--dur': `${rand(0.7, 1.1)}s`,
        '--delay': `${rand(0, 0.15)}s`,
        '--c': COLORS[i % COLORS.length],
        '--w': `${rand(5, 8)}px`,
        '--h': `${rand(8, 12)}px`,
        '--r': '0deg',
      } as React.CSSProperties;
    }), [mode, count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none z-[70] overflow-hidden ${
        mode === 'rain' ? 'fixed inset-0' : 'absolute inset-0'
      }`}
    >
      {pieces.map((style, i) => (
        <div
          key={i}
          className={`absolute ${mode === 'rain' ? 'animate-confetti-rain' : 'animate-confetti-burst'}`}
          style={{
            ...style,
            width: 'var(--w)',
            height: 'var(--h)',
            backgroundColor: 'var(--c)',
            transform: `rotate(var(--r))`,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}
