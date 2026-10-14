'use client';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  positive: boolean;
}

export default function Sparkline({ data, width = 90, height = 32, positive }: SparklineProps) {
  if (data.length < 2) {
    return <div style={{ width, height }} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const color = positive ? '#10b981' : '#ef4444';
  const fillId = `spark-${positive ? 'up' : 'down'}`;

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`${pad},${height - pad} ${points} ${width - pad},${height - pad}`}
        fill={`url(#${fillId})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
