"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { ProductCard } from "./product-card";
import { getTrendingProducts, getBestDeals } from "@/data/products";

interface FeaturedSectionProps {
  title: string;
  subtitle: string;
  type: "trending" | "deals";
}

export function FeaturedSection({ title, subtitle, type }: FeaturedSectionProps) {
  const products = type === "trending" ? getTrendingProducts() : getBestDeals();

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              {type === "trending" && <Flame className="w-5 h-5 text-accent" />}
              <span className={`text-sm font-semibold uppercase tracking-wider ${
                type === "trending" ? "text-accent" : "text-accent-green"
              }`}>
                {type === "trending" ? "Trending Now" : "Best Deals"}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text">{title}</h2>
            <p className="text-text-muted mt-2">{subtitle}</p>
          </div>
          <Link
            href={type === "trending" ? "/trending" : "/deals"}
            className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}