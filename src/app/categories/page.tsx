"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import { categories, getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/product-card";

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
};

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const products = getProductsByCategory(selectedCategory);

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
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <LayoutGrid className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text">Browse Categories</h1>
              <p className="text-text-muted">Explore deals by category</p>
            </div>
          </div>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
        >
          {categories.filter(c => c.id !== "all").map((category, i) => {
            const Icon = iconMap[category.icon] || LayoutGrid;
            const isSelected = selectedCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-primary/10 border-primary/30"
                    : "bg-surface-light border-border hover:border-primary/20"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  isSelected ? "bg-primary/20" : "bg-surface"
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-text-muted"}`} />
                </div>
                <h3 className={`font-semibold mb-1 ${isSelected ? "text-primary" : "text-text"}`}>
                  {category.name}
                </h3>
                <p className="text-sm text-text-muted">{category.productCount} products</p>

                {isSelected && (
                  <motion.div
                    layoutId="selectedCategory"
                    className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <ArrowRight className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Products in Selected Category */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text mb-6">
            {categories.find(c => c.id === selectedCategory)?.name} Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}