"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Star, TrendingDown, Clock } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, formatNumber, getDealScoreLabel, getDealScoreColor } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isHotDeal = product.dealScore >= 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/product/${product.id}`}>
        <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-surface-light">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isHotDeal && (
                <span className="badge-deal flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Hot Deal
                </span>
              )}
              {product.discount >= 30 && (
                <span className="badge bg-accent-red/20 text-accent-red border border-accent-red/30">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Platform Badge */}
            <div className="absolute top-3 right-3">
              <span className={`badge ${
                product.platform === "amazon" ? "badge-amazon" : "badge-flipkart"
              }`}>
                {product.platform === "amazon" ? "Amazon" : "Flipkart"}
              </span>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="px-4 py-2 bg-accent-red/90 text-white text-sm font-semibold rounded-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Category Tag */}
            <span className="text-xs text-text-muted uppercase tracking-wider mb-2">
              {product.category}
            </span>

            {/* Title */}
            <h3 className="text-sm font-semibold text-text line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span className="text-sm font-medium text-text">{product.rating}</span>
              </div>
              <span className="text-xs text-text-muted">
                ({formatNumber(product.reviewCount)})
              </span>
            </div>

            {/* Price */}
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-text">{formatPrice(product.price)}</span>
                <span className="text-sm text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-accent-green font-medium">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            </div>

            {/* Deal Score */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border w-fit mb-3 ${getDealScoreColor(product.dealScore)}`}>
              <span>Deal Score: {product.dealScore}/100</span>
              <span className="opacity-70">• {getDealScoreLabel(product.dealScore)}</span>
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-1.5 text-xs text-text-muted mt-auto">
              <Clock className="w-3 h-3" />
              <span>Delivery: {product.deliveryTime}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="px-4 pb-4">
            <button className="w-full btn-primary text-sm py-2.5 flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Deal
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}