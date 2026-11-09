import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartCanvas({ type, data, options, plugins, id }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type,
      data,
      options,
      plugins: plugins || [],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [type, data, options, plugins]);

  return <canvas id={id} ref={canvasRef}></canvas>;
}
