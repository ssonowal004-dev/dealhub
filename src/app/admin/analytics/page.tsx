"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointerClick,
  ShoppingCart,
  IndianRupee,
  Calendar,
  Download,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", clicks: 3200, conversions: 142, revenue: 18500 },
  { month: "Feb", clicks: 4100, conversions: 189, revenue: 24600 },
  { month: "Mar", clicks: 3800, conversions: 165, revenue: 21500 },
  { month: "Apr", clicks: 5200, conversions: 234, revenue: 30400 },
  { month: "May", clicks: 6100, conversions: 278, revenue: 36100 },
  { month: "Jun", clicks: 5800, conversions: 267, revenue: 34700 },
];

const topProducts = [
  { name: "iPhone 15 Pro Max", clicks: 1240, conversions: 45, revenue: "₹72,000", growth: "+23%" },
  { name: "Sony WH-1000XM5", clicks: 980, conversions: 52, revenue: "₹15,600", growth: "+18%" },
  { name: "MacBook Air M3", clicks: 856, conversions: 28, revenue: "₹32,200", growth: "+15%" },
  { name: "Kindle Paperwhite", clicks: 742, conversions: 61, revenue: "₹8,500", growth: "+12%" },
  { name: "Samsung Galaxy S24", clicks: 680, conversions: 22, revenue: "₹28,600", growth: "+8%" },
];

export default function AnalyticsPage() {
  const totalClicks = monthlyData.reduce((a, b) => a + b.clicks, 0);
  const totalConversions = monthlyData.reduce((a, b) => a + b.conversions, 0);
  const totalRevenue = monthlyData.reduce((a, b) => a + b.revenue, 0);
  const avgConversionRate = ((totalConversions / totalClicks) * 100).toFixed(2);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text">Analytics</h1>
          <p className="text-text-muted mt-1">Track your affiliate performance and earnings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm text-text hover:border-primary transition-all">
            <Calendar className="w-4 h-4" />
            Last 6 Months
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Clicks", value: totalClicks.toLocaleString(), change: "+28%", icon: MousePointerClick, color: "primary" },
          { title: "Conversions", value: totalConversions.toLocaleString(), change: "+22%", icon: ShoppingCart, color: "accent-green" },
          { title: "Conversion Rate", value: `${avgConversionRate}%`, change: "+3.2%", icon: TrendingUp, color: "accent" },
          { title: "Est. Revenue", value: `₹${(totalRevenue / 1000).toFixed(1)}K`, change: "+35%", icon: IndianRupee, color: "accent-green" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.color === "primary" ? "bg-primary/10" :
                  stat.color === "accent-green" ? "bg-accent-green/10" :
                  "bg-accent/10"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.color === "primary" ? "text-primary" :
                    stat.color === "accent-green" ? "text-accent-green" :
                    "text-accent"
                  }`} />
                </div>
                <span className="text-sm font-medium text-accent-green flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-muted mt-1">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Clicks Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-text mb-6">Monthly Clicks</h2>
          <div className="h-64 flex items-end gap-4">
            {monthlyData.map((data, i) => {
              const maxClicks = Math.max(...monthlyData.map(d => d.clicks));
              const height = (data.clicks / maxClicks) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="w-full bg-gradient-to-t from-primary/60 to-primary rounded-t-lg relative group"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.clicks.toLocaleString()} clicks
                    </div>
                  </motion.div>
                  <span className="text-xs text-text-muted">{data.month}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-text mb-6">Monthly Revenue</h2>
          <div className="h-64 flex items-end gap-4">
            {monthlyData.map((data, i) => {
              const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                    className="w-full bg-gradient-to-t from-accent-green/60 to-accent-green rounded-t-lg relative group"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-border px-3 py-1.5 rounded-lg text-xs text-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ₹{data.revenue.toLocaleString()}
                    </div>
                  </motion.div>
                  <span className="text-xs text-text-muted">{data.month}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Top Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-text mb-6">Top Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider pb-4">Product</th>
                <th className="text-right text-xs font-medium text-text-muted uppercase tracking-wider pb-4">Clicks</th>
                <th className="text-right text-xs font-medium text-text-muted uppercase tracking-wider pb-4">Conversions</th>
                <th className="text-right text-xs font-medium text-text-muted uppercase tracking-wider pb-4">Revenue</th>
                <th className="text-right text-xs font-medium text-text-muted uppercase tracking-wider pb-4">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topProducts.map((product, i) => (
                <motion.tr
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="hover:bg-surface-light/30 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-text">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right text-sm text-text">{product.clicks.toLocaleString()}</td>
                  <td className="py-4 text-right text-sm text-text">{product.conversions}</td>
                  <td className="py-4 text-right text-sm font-semibold text-accent-green">{product.revenue}</td>
                  <td className="py-4 text-right">
                    <span className="text-sm text-accent-green flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {product.growth}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}