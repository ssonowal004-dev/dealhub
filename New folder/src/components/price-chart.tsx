"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface PriceChartProps {
  product: Product;
}

export function PriceChart({ product }: PriceChartProps) {
  const { minPrice, maxPrice, avgPrice, trend } = useMemo(() => {
    const prices = product.priceHistory.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const trendValue = ((lastPrice - firstPrice) / firstPrice) * 100;
    return { minPrice: min, maxPrice: max, avgPrice: avg, trend: trendValue };
  }, [product.priceHistory]);

  const chartHeight = 120;
  const chartWidth = 100;
  const padding = 5;

  const points = useMemo(() => {
    const range = maxPrice - minPrice || 1;
    return product.priceHistory.map((point, i) => {
      const x = padding + (i / (product.priceHistory.length - 1)) * (chartWidth - padding * 2);
      const y = chartHeight - padding - ((point.price - minPrice) / range) * (chartHeight - padding * 2);
      return `${x},${y}`;
    });
  }, [product.priceHistory, minPrice, maxPrice]);

  const areaPath = `M${points[0]} ${points.slice(1).map((p) => `L${p}`).join(" ")} L${chartWidth - padding},${chartHeight} L${padding},${chartHeight} Z`;
  const linePath = `M${points[0]} ${points.slice(1).map((p) => `L${p}`).join(" ")}`;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text">Price History</h3>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium ${
          trend < -5 
            ? "bg-accent-green/10 text-accent-green" 
            : trend > 5 
            ? "bg-accent-red/10 text-accent-red" 
            : "bg-text-muted/10 text-text-muted"
        }`}>
          {trend < -5 ? <TrendingDown className="w-4 h-4" /> : trend > 5 ? <TrendingUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          {Math.abs(trend).toFixed(1)}% {trend < 0 ? "drop" : trend > 0 ? "rise" : "stable"}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl bg-surface-light">
          <p className="text-xs text-text-muted mb-1">Lowest</p>
          <p className="text-sm font-bold text-accent-green">{formatPrice(minPrice)}</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-surface-light">
          <p className="text-xs text-text-muted mb-1">Average</p>
          <p className="text-sm font-bold text-text">{formatPrice(avgPrice)}</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-surface-light">
          <p className="text-xs text-text-muted mb-1">Highest</p>
          <p className="text-sm font-bold text-accent-red">{formatPrice(maxPrice)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-32"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`gradient-${product.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={areaPath}
            fill={`url(#gradient-${product.id})`}
          />
          <path
            d={linePath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Current price dot */}
          <circle
            cx={points[points.length - 1].split(",")[0]}
            cy={points[points.length - 1].split(",")[1]}
            r="2"
            fill="#6366f1"
            stroke="#fff"
            strokeWidth="0.5"
          />
        </svg>

        {/* Current Price Label */}
        <div className="absolute right-0 top-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
          {formatPrice(product.price)}
        </div>
      </div>

      <p className="text-xs text-text-muted mt-3 text-center">
        Price history for the last 30 days
      </p>
    </div>
  );
}