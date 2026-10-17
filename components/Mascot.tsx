'use client';

export type MascotMood = 'idle' | 'happy' | 'party' | 'sad' | 'dead';

interface MascotProps {
  mood?: MascotMood;
  size?: number;
  className?: string;
}

/**
 * Quest the bull — TradeCub's mascot. Pure SVG, styled per mood:
 * idle (teacher), happy (correct!), party (lesson complete), sad (wrong),
 * dead (out of lives). Animate via the animate-mascot-* classes in globals.
 */
export default function Mascot({ mood = 'idle', size = 80, className = '' }: MascotProps) {
  const dead = mood === 'dead';
  const sad = mood === 'sad';

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Quest the bull, feeling ${mood}`}
    >
      {/* party hat */}
      {mood === 'party' && (
        <g>
          <polygon points="60,2 44,30 76,30" fill="#7C3AED" />
          <path d="M50 21 L56 10 M60 24 L63 15" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="4" r="5" fill="#FBBF24" />
        </g>
      )}

      {/* horns */}
      <path d="M30 40 C16 34 12 20 17 11 C28 17 35 26 37 36 Z" fill="#E8C078" />
      <path d="M90 40 C104 34 108 20 103 11 C92 17 85 26 83 36 Z" fill="#E8C078" />

      {/* ears — droop when sad/dead */}
      <ellipse
        cx="24" cy="48" rx="11" ry="7" fill="#B0783F"
        transform={`rotate(${sad || dead ? -35 : -20} 24 48)`}
      />
      <ellipse
        cx="96" cy="48" rx="11" ry="7" fill="#B0783F"
        transform={`rotate(${sad || dead ? 35 : 20} 96 48)`}
      />

      {/* head */}
      <circle cx="60" cy="64" r="38" fill="#C98E4E" />

      {/* forehead candlestick marking — the brand */}
      <rect x="56" y="30" width="8" height="12" rx="2" fill="#22C55E" />
      <line x1="60" y1="26" x2="60" y2="30" stroke="#22C55E" strokeWidth="2" />
      <line x1="60" y1="42" x2="60" y2="46" stroke="#22C55E" strokeWidth="2" />

      {/* eyes */}
      {dead ? (
        <g stroke="#4A2E15" strokeWidth="3.5" strokeLinecap="round">
          <line x1="40" y1="52" x2="50" y2="62" /><line x1="50" y1="52" x2="40" y2="62" />
          <line x1="70" y1="52" x2="80" y2="62" /><line x1="80" y1="52" x2="70" y2="62" />
        </g>
      ) : (
        <g>
          <circle cx="46" cy="56" r="7" fill="#fff" />
          <circle cx="74" cy="56" r="7" fill="#fff" />
          {sad ? (
            <>
              <circle cx="47" cy="59" r="3.5" fill="#2B1A0C" />
              <circle cx="73" cy="59" r="3.5" fill="#2B1A0C" />
              {/* droopy upper lids */}
              <path d="M39 52 Q46 48 53 52" stroke="#8C5A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M67 52 Q74 48 81 52" stroke="#8C5A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="47.5" cy="56" r="3.5" fill="#2B1A0C" />
              <circle cx="75.5" cy="56" r="3.5" fill="#2B1A0C" />
              <circle cx="49" cy="54.5" r="1.2" fill="#fff" />
              <circle cx="77" cy="54.5" r="1.2" fill="#fff" />
            </>
          )}
        </g>
      )}

      {/* muzzle */}
      <ellipse cx="60" cy="82" rx="22" ry="16" fill="#F3D9B6" />
      <ellipse cx="52" cy="80" rx="3" ry="2.5" fill="#A9682F" />
      <ellipse cx="68" cy="80" rx="3" ry="2.5" fill="#A9682F" />

      {/* mouth by mood */}
      {dead ? (
        <line x1="52" y1="91" x2="68" y2="91" stroke="#7A3B1E" strokeWidth="2.5" strokeLinecap="round" />
      ) : sad ? (
        <path d="M50 93 Q60 86 70 93" stroke="#7A3B1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : mood === 'party' ? (
        <g>
          <ellipse cx="60" cy="90" rx="9" ry="7" fill="#7A3B1E" />
          <ellipse cx="60" cy="93" rx="5.5" ry="3.5" fill="#E88" />
        </g>
      ) : (
        <path
          d={mood === 'happy' ? 'M48 88 Q60 99 72 88' : 'M50 89 Q60 95 70 89'}
          stroke="#7A3B1E" strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
      )}

      {/* party sparkles */}
      {mood === 'party' && (
        <g fill="#FBBF24">
          <path d="M20 30 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" />
          <path d="M98 24 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" />
        </g>
      )}
    </svg>
  );
}
