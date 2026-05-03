"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  MoreVertical,
  ArrowUpDown,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import { products as allProducts, categories } from "@/data/products";
import { Product } from "@/lib/types";
import { formatPrice, formatNumber } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesPlatform = selectedPlatform === "all" || p.platform === selectedPlatform;
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const toggleSelection = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
    setSelectedProducts(prev => prev.filter(p => p !== id));
  };

  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text">Products</h1>
          <p className="text-text-muted mt-1">Manage your affiliate products</p>
        </div>
        <Link href="/admin/products/add">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </motion.button>
        </Link>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4 space-y-4"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search products by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm 
                       text-text placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-surface-light border border-border rounded-xl">
              <Filter className="w-4 h-4 text-text-muted" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm text-text focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c.id !== "all").map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2.5 bg-surface-light border border-border rounded-xl">
              <ArrowUpDown className="w-4 h-4 text-text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-text focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="deal-score">Deal Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Platform Filter Pills */}
        <div className="flex items-center gap-2">
          {["all", "amazon", "flipkart"].map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedPlatform === platform
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-surface-light border border-border text-text-muted hover:text-text"
              }`}
            >
              {platform === "all" ? "All Platforms" : platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <span className="text-sm text-primary font-medium">
              {selectedProducts.length} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-red/10 text-accent-red text-sm font-medium hover:bg-accent-red/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedProducts([])}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Clear
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-light/50">
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={toggleAll}
                    className="w-5 h-5 rounded border border-border flex items-center justify-center transition-all hover:border-primary"
                  >
                    {selectedProducts.length === filteredProducts.length && filteredProducts.length > 0 && (
                      <Check className="w-3.5 h-3.5 text-primary" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Platform</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group hover:bg-surface-light/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleSelection(product.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        selectedProducts.includes(product.id)
                          ? "bg-primary border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {selectedProducts.includes(product.id) && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-light shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{product.name}</p>
                        <p className="text-xs text-text-muted">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-text">{formatPrice(product.price)}</p>
                      <p className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      product.platform === "amazon"
                        ? "bg-[#ff9900]/10 text-[#ff9900] border border-[#ff9900]/20"
                        : "bg-[#2874f0]/10 text-[#2874f0] border border-[#2874f0]/20"
                    }`}>
                      {product.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-muted capitalize">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-surface-light rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${product.dealScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-text">{product.dealScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                      product.inStock
                        ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
                        : "bg-accent-red/10 text-accent-red border border-accent-red/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-accent-green" : "bg-accent-red"}`} />
                      {product.inStock ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <button className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </Link>
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setShowDeleteConfirm(product.id)}
                        className="p-2 rounded-lg text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">No products found</h3>
            <p className="text-sm text-text-muted">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:border-primary transition-all">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-sm text-text-muted hover:text-text hover:border-primary transition-all">
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent-red/10 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-accent-red" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Delete Product</h3>
                <p className="text-sm text-text-muted">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 btn-outline py-2.5"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-accent-red hover:bg-accent-red/90 text-white py-2.5 rounded-xl font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}