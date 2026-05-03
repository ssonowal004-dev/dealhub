"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  ImagePlus,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { categories } from "@/data/products";

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "electronics",
    platform: "amazon",
    affiliateUrl: "",
    image: "",
    rating: "4.5",
    reviewCount: "",
    features: [""],
    deliveryTime: "1-2 days",
    tags: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      router.push("/admin/products");
    }, 2000);
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div className="w-20 h-20 rounded-full bg-accent-green/10 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-accent-green" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">Product Added!</h2>
        <p className="text-text-muted">Redirecting to products list...</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Link href="/admin/products">
          <button className="p-2 rounded-xl hover:bg-surface-light transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-muted" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-text">Add New Product</h1>
          <p className="text-text-muted">Add a new affiliate product to your store</p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Basic Info */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-2">Product Name *</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., iPhone 15 Pro Max"
                className="w-full input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-2">Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Detailed product description..."
                rows={4}
                className="w-full input-field resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Current Price (₹) *</label>
              <input
                required
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="159900"
                className="w-full input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Original Price (₹) *</label>
              <input
                required
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleChange("originalPrice", e.target.value)}
                placeholder="179900"
                className="w-full input-field"
              />
            </div>
          </div>
        </div>

        {/* Platform & Category */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
            Platform & Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Platform *</label>
              <div className="grid grid-cols-2 gap-3">
                {["amazon", "flipkart"].map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handleChange("platform", platform)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.platform === platform
                        ? platform === "amazon"
                          ? "bg-[#ff9900]/10 border-[#ff9900]/30 text-[#ff9900]"
                          : "bg-[#2874f0]/10 border-[#2874f0]/30 text-[#2874f0]"
                        : "border-border text-text-muted hover:text-text hover:border-text-muted/30"
                    }`}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full input-field"
              >
                {categories.filter(c => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text mb-2">Affiliate URL *</label>
              <input
                required
                type="url"
                value={formData.affiliateUrl}
                onChange={(e) => handleChange("affiliateUrl", e.target.value)}
                placeholder="https://www.amazon.in/dp/B0..."
                className="w-full input-field"
              />
              <p className="text-xs text-text-muted mt-1">
                Paste your affiliate link from {formData.platform === "amazon" ? "Amazon Associates" : "Flipkart Affiliate"}
              </p>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</span>
            Media
          </h2>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Product Image URL *</label>
            <div className="flex gap-3">
              <input
                required
                type="url"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 input-field"
              />
              <button
                type="button"
                className="px-4 py-3 rounded-xl bg-surface-light border border-border text-text-muted hover:text-text transition-colors"
              >
                <ImagePlus className="w-5 h-5" />
              </button>
            </div>
            {formData.image && (
              <div className="mt-4 w-32 h-32 rounded-xl overflow-hidden bg-surface-light">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-text flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">4</span>
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Rating (0-5)</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleChange("rating", e.target.value)}
                className="w-full input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Review Count</label>
              <input
                type="number"
                value={formData.reviewCount}
                onChange={(e) => handleChange("reviewCount", e.target.value)}
                placeholder="12543"
                className="w-full input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Delivery Time</label>
              <input
                type="text"
                value={formData.deliveryTime}
                onChange={(e) => handleChange("deliveryTime", e.target.value)}
                placeholder="1-2 days"
                className="w-full input-field"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">Key Features</label>
            <div className="space-y-3">
              {formData.features.map((feature, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className="flex-1 input-field"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="px-3 py-2 rounded-xl bg-accent-red/10 text-accent-red hover:bg-accent-red/20 transition-colors"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              placeholder="trending, bestseller, premium"
              className="w-full input-field"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2 px-8 py-4 text-base disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding Product...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Product
              </>
            )}
          </button>
          <Link href="/admin/products">
            <button type="button" className="btn-outline px-8 py-4">
              Cancel
            </button>
          </Link>
        </div>
      </motion.form>
    </div>
  );
}