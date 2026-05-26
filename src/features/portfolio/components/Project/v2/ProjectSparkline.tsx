/**
 * ProjectSparkline — Area chart (filled polyline) with gradient fill.
 * Uses useId() for unique gradient IDs to support multiple concurrent instances.
 */

import { useId } from 'react';

interface ProjectSparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function ProjectSparkline({
  data,
  color = '#27AE60',
  width = 64,
  height = 24,
}: ProjectSparklineProps) {
  // React 18+ — each instance gets a stable, unique ID so gradients don't collide
  const uid = useId();
  const gradId = `sg${uid.replace(/:/g, '')}`;

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Map data to (x, y) pixel coordinates with 3px vertical padding
  const pts = data.map((value, index) => ({
    x: (index / (data.length - 1)) * width,
    y: height - ((value - min) / range) * (height - 6) - 3,
  }));

  // Polyline string for the line stroke
  const linePoints = pts.map((p) => `${p.x},${p.y}`).join(' ');

  // Closed SVG path for the filled area under the line
  const areaPath = [
    `M ${pts[0].x},${pts[0].y}`,
    ...pts.slice(1).map((p) => `L ${p.x},${p.y}`),
    `L ${pts[pts.length - 1].x},${height}`,
    `L ${pts[0].x},${height}`,
    'Z',
  ].join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className="proj-sparkline"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Filled area */}
      <path d={areaPath} fill={`url(#${gradId})`} />
      {/* Line stroke on top */}
      <polyline
        points={linePoints}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
