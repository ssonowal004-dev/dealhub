"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Eye } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { getTrendingProducts } from "@/data/products";

export default function TrendingPage() {
  const trendingProducts = getTrendingProducts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text">Trending Products</h1>
              <p className="text-text-muted">{trendingProducts.length} hot items right now</p>
            </div>
          </div>
        </motion.div>

        {/* Trending Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: TrendingUp, label: "Most Viewed", value: "iPhone 15 Pro Max", color: "text-accent" },
            { icon: Flame, label: "Hot Deal", value: "Sony WH-1000XM5", color: "text-accent-red" },
            { icon: Eye, label: "Price Drop", value: "MacBook Air M3", color: "text-accent-green" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-light flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-text-muted">{stat.label}</p>
                <p className="text-sm font-semibold text-text">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Products */}
        <ProductGrid products={trendingProducts} />
      </div>
    </div>
  );
}