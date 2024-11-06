import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface PriceChartProps {
  data: { timestamp: number; price: number; }[];
  width: number;
  height: number;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate scaling factors
    const xScale = width / (data.length - 1);
    const minPrice = Math.min(...data.map(d => d.price));
    const maxPrice = Math.max(...data.map(d => d.price));
    const priceRange = maxPrice - minPrice;
    const yScale = (height - 40) / priceRange;

    // Transform data points
    const points: Point[] = data.map((d, i) => ({
      x: i * xScale,
      y: height - ((d.price - minPrice) * yScale) - 20
    }));

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, height);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, height);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point, i) => {
      if (i === 0) return;
      const xc = (points[i - 1].x + point.x) / 2;
      const yc = (points[i - 1].y + point.y) / 2;
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    });
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points
    points.forEach((point, i) => {
      if (i % Math.floor(points.length / 5) === 0) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw price label
        ctx.font = '12px Inter';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'center';
        ctx.fillText(
          `$${data[i].price.toFixed(2)}`,
          point.x,
          point.y - 10
        );
      }
    });
  };

  useEffect(() => {
    drawChart();
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
    />
  );
};