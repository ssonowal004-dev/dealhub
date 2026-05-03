"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpDown, TrendingDown, Star, Percent } from "lucide-react";

type SortOption = "relevance" | "price-low" | "price-high" | "discount" | "rating" | "deal-score";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: "relevance", label: "Relevance", icon: ArrowUpDown },
  { value: "price-low", label: "Price: Low to High", icon: TrendingDown },
  { value: "price-high", label: "Price: High to Low", icon: TrendingDown },
  { value: "discount", label: "Highest Discount", icon: Percent },
  { value: "rating", label: "Highest Rated", icon: Star },
  { value: "deal-score", label: "Best Deal Score", icon: ArrowUpDown },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm 
                 text-text hover:border-primary transition-all duration-200"
      >
        <ArrowUpDown className="w-4 h-4 text-text-muted" />
        <span>Sort: {selected?.label}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                      value === option.value
                        ? "bg-primary/10 text-primary"
                        : "text-text hover:bg-surface-light"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                    {value === option.value && (
                      <motion.div
                        layoutId="sortIndicator"
                        className="ml-auto w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}