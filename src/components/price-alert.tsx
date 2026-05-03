"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Target, CheckCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface PriceAlertProps {
  product: Product;
}

export function PriceAlert({ product }: PriceAlertProps) {
  const [email, setEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState(Math.round(product.price * 0.85));
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && targetPrice > 0) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text">Price Drop Alert</h3>
          <p className="text-sm text-text-muted">Get notified when the price drops</p>
        </div>
      </div>

      {isSubscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-accent-green/10 border border-accent-green/20"
        >
          <CheckCircle className="w-5 h-5 text-accent-green shrink-0" />
          <div>
            <p className="text-sm font-medium text-accent-green">Alert Set Successfully!</p>
            <p className="text-xs text-text-muted">We will email you when the price drops below {formatPrice(targetPrice)}</p>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Target Price
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text 
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                min={1}
              />
            </div>
            <p className="text-xs text-text-muted mt-1">
              Current price: {formatPrice(product.price)} — You save {formatPrice(product.price - targetPrice)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text 
                         placeholder:text-text-muted focus:outline-none focus:border-primary 
                         focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Set Price Alert
          </button>

          <p className="text-xs text-text-muted text-center">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}