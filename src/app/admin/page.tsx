"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  TrendingUp,
  MousePointerClick,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ShoppingCart,
  Clock,
} from "lucide-react";
import { products } from "@/data/products";
import { formatPrice, formatNumber } from "@/lib/utils";

const stats = [
  {
    title: "Total Products",
    value: products.length,
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "primary",
  },
  {
    title: "Total Clicks",
    value: 45231,
    change: "+28%",
    trend: "up",
    icon: MousePointerClick,
    color: "accent-green",
  },
  {
    title: "Conversions",
    value: 1847,
    change: "+15%",
    trend: "up",
    icon: ShoppingCart,
    color: "accent",
  },
  {
    title: "Est. Revenue",
    value: "₹1,24,500",
    change: "-5%",
    trend: "down",
    icon: IndianRupee,
    color: "accent-red",
  },
];

const recentProducts = products.slice(0, 5);

const topPerformers = [...products]
  .sort((a, b) => b.dealScore - a.dealScore)
  .slice(0, 5);

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            Last updated: Just now
          </span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isUp = stat.trend === "up";
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.color === "primary" ? "bg-primary/10" :
                  stat.color === "accent-green" ? "bg-accent-green/10" :
                  stat.color === "accent" ? "bg-accent/10" :
                  "bg-accent-red/10"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === "primary" ? "text-primary" :
                    stat.color === "accent-green" ? "text-accent-green" :
                    stat.color === "accent" ? "text-accent" :
                    "text-accent-red"
                  }`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  isUp ? "text-accent-green" : "text-accent-red"
                }`}>
                  {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-muted mt-1">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text">Click Performance</h2>
            <select className="bg-surface-light border border-border rounded-lg px-3 py-1.5 text-sm text-text">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2">
            {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50, 88].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-lg relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-xs text-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {height * 100} clicks
                  </div>
                </motion.div>
                <span className="text-xs text-text-muted">{["M","T","W","T","F","S","S","M","T","W","T","F"][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-text mb-6">Platform Distribution</h2>
          <div className="space-y-6">
            {[
              { platform: "Amazon", percentage: 58, color: "#ff9900", revenue: "₹72,210" },
              { platform: "Flipkart", percentage: 42, color: "#2874f0", revenue: "₹52,290" },
            ].map((item) => (
              <div key={item.platform}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">{item.platform}</span>
                  <span className="text-sm text-text-muted">{item.revenue}</span>
                </div>
                <div className="h-3 bg-surface-light rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1">{item.percentage}% of total traffic</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-text mb-4">Top Categories</h3>
            <div className="space-y-3">
              {["Electronics", "Fashion", "Home & Kitchen"].map((cat, i) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">{cat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-surface-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${[45, 30, 25][i]}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-muted w-8 text-right">{[45, 30, 25][i]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Products Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text">Recent Products</h2>
            <Link href="/admin/products" className="text-sm text-primary hover:text-primary-light transition-colors">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider pb-3">Product</th>
                  <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider pb-3">Price</th>
                  <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider pb-3">Platform</th>
                  <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentProducts.map((product) => (
                  <tr key={product.id} className="group">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-light overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm text-text font-medium line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-text">{formatPrice(product.price)}</span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${
                        product.platform === "amazon"
                          ? "bg-[#ff9900]/10 text-[#ff9900]"
                          : "bg-[#2874f0]/10 text-[#2874f0]"
                      }`}>
                        {product.platform}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                        product.inStock
                          ? "bg-accent-green/10 text-accent-green"
                          : "bg-accent-red/10 text-accent-red"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-accent-green" : "bg-accent-red"}`} />
                        {product.inStock ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text">Top Performers</h2>
            <Link href="/admin/products" className="text-sm text-primary hover:text-primary-light transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {topPerformers.map((product, i) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-light/50 hover:bg-surface-light transition-colors">
                <span className="text-lg font-bold text-text-muted w-6">{i + 1}</span>
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Eye className="w-3 h-3 text-text-muted" />
                    <span className="text-xs text-text-muted">{formatNumber(product.reviewCount)} views</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-text">{formatPrice(product.price)}</p>
                  <p className={`text-xs font-medium ${
                    product.dealScore >= 80 ? "text-accent" :
                    product.dealScore >= 60 ? "text-accent-green" :
                    "text-text-muted"
                  }`}>
                    Score: {product.dealScore}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}