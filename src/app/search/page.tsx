"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { searchProducts } from "@/data/products";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const results = searchProducts(query);

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
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text">
                {query ? `Results for "${query}"` : "Search Products"}
              </h1>
              <p className="text-text-muted">
                {results.length} {results.length === 1 ? "product" : "products"} found
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          action="/search"
          className="relative max-w-2xl mb-10"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for products, brands, categories..."
            className="w-full pl-12 pr-12 py-4 bg-surface-light border border-border rounded-xl text-text 
                     placeholder:text-text-muted focus:outline-none focus:border-primary 
                     focus:ring-2 focus:ring-primary/20 text-lg"
          />
          {query && (
            <Link
              href="/search"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-surface flex items-center justify-center 
                       text-text-muted hover:text-text transition-colors"
            >
              <X className="w-4 h-4" />
            </Link>
          )}
        </motion.form>

        {/* Results */}
        <ProductGrid 
          products={results} 
          emptyMessage={query ? `No products found for "${query}"` : "Start typing to search products"}
        />
      </div>
    </div>
  );
}