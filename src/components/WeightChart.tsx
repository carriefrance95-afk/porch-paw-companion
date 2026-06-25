import React from 'react';
import type { WeightEntry } from '../types';

interface WeightChartProps {
  history: WeightEntry[];
  goalWeight?: number;
  healthyRange?: { min: number; max: number };
}

const WeightChart: React.FC<WeightChartProps> = ({ history, goalWeight, healthyRange }) => {
  const data = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const hasEnoughData = data.length >= 2;
  const width = 560;
  const height = 260;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  if (!hasEnoughData) {
    return (
      <div className="h-56 rounded-[1.75rem] border border-base-300 bg-base-200 flex flex-col items-center justify-center text-center px-6">
        <p className="text-sm font-semibold text-neutral">Add at least two weight entries to reveal your trend.</p>
        <p className="mt-2 text-xs text-neutral opacity-70">The chart updates automatically as you log more weight history.</p>
      </div>
    );
  }

  const allWeights = data.map(point => point.weight);
  if (goalWeight !== undefined) allWeights.push(goalWeight);
  if (healthyRange) {
    allWeights.push(healthyRange.min, healthyRange.max);
  }

  const minWeight = Math.max(0, Math.min(...allWeights) - 2);
  const maxWeight = Math.max(...allWeights) + 2;
  const weightRange = Math.max(1, maxWeight - minWeight);

  const getX = (index: number) => padding + (graphWidth / Math.max(1, data.length - 1)) * index;
  const getY = (weight: number) => padding + graphHeight - ((weight - minWeight) / weightRange) * graphHeight;

  const points = data.map((point, index) => `${getX(index)},${getY(point.weight)}`).join(' ');
  const formatLabel = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-base-100 p-5 rounded-[2rem] border border-base-300 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-neutral opacity-70">Weight Overview</p>
          <h4 className="mt-2 text-lg font-black text-neutral">Trend and Goal Progress</h4>
        </div>
        {goalWeight !== undefined && (
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Goal {goalWeight.toFixed(1)} kg</span>
        )}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <rect x={padding} y={padding} width={graphWidth} height={graphHeight} rx="30" fill="#fff" />

        <line x1={padding} y1={padding} x2={padding} y2={padding + graphHeight} stroke="#d7d0c5" strokeWidth="1" />
        <line x1={padding} y1={padding + graphHeight} x2={padding + graphWidth} y2={padding + graphHeight} stroke="#d7d0c5" strokeWidth="1" />

        {healthyRange && (
          <rect
            x={padding}
            y={getY(healthyRange.max)}
            width={graphWidth}
            height={Math.max(1, getY(healthyRange.min) - getY(healthyRange.max))}
            fill="#7a7b5a1a"
          />
        )}

        {goalWeight !== undefined && (
          <line
            x1={padding}
            y1={getY(goalWeight)}
            x2={padding + graphWidth}
            y2={getY(goalWeight)}
            stroke="#b65e3c"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        )}

        <polyline
          fill="none"
          stroke="#b65e3c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        <polyline
          fill="rgba(182,94,60,0.12)"
          stroke="none"
          points={`${points} ${getX(data.length - 1)},${padding + graphHeight} ${getX(0)},${padding + graphHeight}`}
        />

        {data.map((point, index) => (
          <g key={point.id}>
            <circle cx={getX(index)} cy={getY(point.weight)} r="5" fill="#fff" stroke="#b65e3c" strokeWidth="2" />
            <circle cx={getX(index)} cy={getY(point.weight)} r="2.5" fill="#b65e3c" />
          </g>
        ))}

        {data.map((point, index) => (
          <text
            key={`label-${index}`}
            x={getX(index)}
            y={padding + graphHeight + 18}
            textAnchor={index === 0 ? 'start' : index === data.length - 1 ? 'end' : 'middle'}
            fontSize="10"
            fill="#2e2b28"
            opacity="0.7"
          >
            {formatLabel(point.date)}
          </text>
        ))}

        {healthyRange && (
          <text x={padding + graphWidth} y={getY(healthyRange.max) - 8} textAnchor="end" fontSize="10" fill="#7a7b5a" fontWeight="700">
            Healthy range
          </text>
        )}
      </svg>
    </div>
  );
};

export default WeightChart;
