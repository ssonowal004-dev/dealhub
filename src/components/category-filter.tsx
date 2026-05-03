"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
} from "lucide-react";
import { categories } from "@/data/products";

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
};

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || LayoutGrid;
        const isActive = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap 
                       transition-all duration-200 border ${
              isActive
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-surface-light border-border text-text-muted hover:text-text hover:border-text-muted/30"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-md ${
              isActive ? "bg-primary/20" : "bg-surface"
            }`}>
              {category.productCount}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 border-2 border-primary/30 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}