import React from 'react';
import type { WeightEntry } from '../types';

interface WeightChartProps {
  history: WeightEntry[];
  goalWeight?: number;
}

const WeightChart: React.FC<WeightChartProps> = ({ history, goalWeight }) => {
  // Sort by date ascending for the chart
  const data = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  if (data.length < 2) return <div className="h-40 flex items-center justify-center text-xs opacity-50 italic">Add more logs to see trend</div>;

  const width = 400;
  const height = 200;
  const padding = 30;

  const weights = data.map(d => d.weight);
  if (goalWeight) weights.push(goalWeight);
  
  const minWeight = Math.min(...weights) * 0.9;
  const maxWeight = Math.max(...weights) * 1.1;
  const weightRange = maxWeight - minWeight;

  const getX = (index: number) => padding + (index * (width - 2 * padding) / (data.length - 1));
  const getY = (weight: number) => height - padding - ((weight - minWeight) * (height - 2 * padding) / weightRange);

  const points = data.map((d, i) => `${getX(i)},${getY(d.weight)}`).join(' ');

  return (
    <div className="bg-base-100 p-4 rounded-2xl border border-base-300">
      <h4 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-wider opacity-60">
        Weight Trend
      </h4>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Goal Line */}
        {goalWeight && (
          <line 
            x1={padding} y1={getY(goalWeight)} x2={width - padding} y2={getY(goalWeight)} 
            stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-primary opacity-50"
          />
        )}
        
        {/* Connection Path */}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          points={points}
        />
        
        {/* Data Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={getX(i)}
            cy={getY(d.weight)}
            r="4"
            className="fill-base-100 stroke-primary"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        <text x={padding} y={height - 5} fontSize="10" className="fill-current opacity-40">Start</text>
        <text x={width - padding} y={height - 5} fontSize="10" textAnchor="end" className="fill-current opacity-40">Latest</text>
        
        {goalWeight && (
          <text x={width - padding} y={getY(goalWeight) - 5} fontSize="10" textAnchor="end" className="fill-primary font-bold">Goal: {goalWeight}kg</text>
        )}
      </svg>
    </div>
  );
};

export default WeightChart;
