"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  ArrowLeft,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Heart,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { getProductById } from "@/data/products";
import { formatPrice, formatNumber, getDealScoreLabel, getDealScoreColor } from "@/lib/utils";
import { PriceChart } from "@/components/price-chart";
import { PriceAlert } from "@/components/price-alert";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-accent-red mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-text mb-2">Product Not Found</h1>
          <p className="text-text-muted mb-6">The product you are looking for does not exist.</p>
          <Link href="/deals" className="btn-primary">
            Browse All Deals
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-text-muted mb-6"
        >
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/deals" className="hover:text-primary transition-colors">Deals</Link>
          <span>/</span>
          <span className="text-text">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass rounded-2xl overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`badge ${
                    product.platform === "amazon" ? "badge-amazon" : "badge-flipkart"
                  }`}>
                    {product.platform === "amazon" ? "Amazon" : "Flipkart"}
                  </span>
                  {product.discount >= 20 && (
                    <span className="badge bg-accent-red/20 text-accent-red border border-accent-red/30">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 rounded-xl bg-surface/80 backdrop-blur flex items-center justify-center text-text-muted hover:text-accent transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-surface/80 backdrop-blur flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category */}
            <span className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-text">{product.rating}</span>
              <span className="text-text-muted">
                ({formatNumber(product.reviewCount)} reviews)
              </span>
            </div>

            {/* Deal Score */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border w-fit mb-6 ${getDealScoreColor(product.dealScore)}`}>
              <span>Deal Score: {product.dealScore}/100</span>
              <span className="opacity-70">• {getDealScoreLabel(product.dealScore)}</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-text">{formatPrice(product.price)}</span>
                <span className="text-xl text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent-green font-semibold">
                  You save {formatPrice(product.originalPrice - product.price)} ({product.discount}% off)
                </span>
                <span className="text-sm text-text-muted">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-text mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-text-muted">
                    <Check className="w-4 h-4 text-accent-green shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: "Fast Delivery", desc: product.deliveryTime },
                { icon: Shield, label: "Secure Purchase", desc: "Official Store" },
                { icon: RotateCcw, label: "Easy Returns", desc: "30-day policy" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-light">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <span className="text-xs font-medium text-text">{item.label}</span>
                  <span className="text-xs text-text-muted">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary flex items-center justify-center gap-2 text-base py-4"
              >
                <ExternalLink className="w-5 h-5" />
                Buy Now on {product.platform === "amazon" ? "Amazon" : "Flipkart"}
              </a>
              <p className="text-xs text-text-muted text-center">
                Redirects to official {product.platform === "amazon" ? "Amazon" : "Flipkart"} store • Affiliate link
              </p>
            </div>
          </motion.div>
        </div>

        {/* Affiliate Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <AffiliateBanner platform={product.platform} url={product.affiliateUrl} />
        </motion.div>

        {/* Price History & Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PriceChart product={product} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PriceAlert product={product} />
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <h2 className="text-xl font-bold text-text mb-4">Product Description</h2>
          <p className="text-text-muted leading-relaxed">{product.description}</p>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-text mb-6">More in {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}