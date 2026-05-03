"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tag, SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import { SortDropdown } from "@/components/sort-dropdown";
import { products, getProductsByCategory } from "@/data/products";
import { Product } from "@/lib/types";

type SortOption = "relevance" | "price-low" | "price-high" | "discount" | "rating" | "deal-score";

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("deal-score");

  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(activeCategory);

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result = [...result].sort((a, b) => b.discount - a.discount);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "deal-score":
        result = [...result].sort((a, b) => b.dealScore - a.dealScore);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text">All Deals</h1>
              <p className="text-text-muted">{filteredProducts.length} products found</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8"
        >
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </motion.div>

        {/* Products */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}