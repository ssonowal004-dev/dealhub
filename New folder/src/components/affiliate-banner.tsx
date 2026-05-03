"use client";

import { motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";

interface AffiliateBannerProps {
  platform: "amazon" | "flipkart";
  url: string;
}

export function AffiliateBanner({ platform, url }: AffiliateBannerProps) {
  const isAmazon = platform === "amazon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 border ${
        isAmazon 
          ? "bg-[#ff9900]/5 border-[#ff9900]/20" 
          : "bg-[#2874f0]/5 border-[#2874f0]/20"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isAmazon ? "bg-[#ff9900]/10" : "bg-[#2874f0]/10"
          }`}>
            <span className={`text-lg font-bold ${
              isAmazon ? "text-[#ff9900]" : "text-[#2874f0]"
            }`}>
              {isAmazon ? "a" : "fk"}
            </span>
          </div>
          <div>
            <h4 className={`font-semibold ${
              isAmazon ? "text-[#ff9900]" : "text-[#2874f0]"
            }`}>
              {isAmazon ? "Amazon" : "Flipkart"} Official Store
            </h4>
            <p className="text-sm text-text-muted mt-0.5">
              You will be redirected to the official {isAmazon ? "Amazon" : "Flipkart"} product page to complete your purchase securely.
            </p>
          </div>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg ${
            isAmazon 
              ? "bg-[#ff9900] hover:bg-[#e88a00] text-white" 
              : "bg-[#2874f0] hover:bg-[#1c5fd1] text-white"
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          Buy on {isAmazon ? "Amazon" : "Flipkart"}
        </a>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
        <Info className="w-3.5 h-3.5 text-text-muted" />
        <p className="text-xs text-text-muted">
          This is an affiliate link. We may earn a small commission at no extra cost to you.
        </p>
      </div>
    </motion.div>
  );
}