import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function calculateDealScore(
  discount: number,
  rating: number,
  reviewCount: number,
  priceDrop: number
): number {
  const discountWeight = 0.35;
  const ratingWeight = 0.25;
  const reviewWeight = 0.20;
  const dropWeight = 0.20;

  const normalizedDiscount = Math.min(discount / 100, 1);
  const normalizedRating = rating / 5;
  const normalizedReviews = Math.min(reviewCount / 10000, 1);
  const normalizedDrop = Math.min(priceDrop / 50, 1);

  const score =
    normalizedDiscount * discountWeight +
    normalizedRating * ratingWeight +
    normalizedReviews * reviewWeight +
    normalizedDrop * dropWeight;

  return Math.round(score * 100);
}

export function getDealScoreLabel(score: number): string {
  if (score >= 85) return "Hot Deal";
  if (score >= 70) return "Great Deal";
  if (score >= 55) return "Good Deal";
  if (score >= 40) return "Fair Deal";
  return "Average";
}

export function getDealScoreColor(score: number): string {
  if (score >= 85) return "text-accent border-accent/30 bg-accent/10";
  if (score >= 70) return "text-accent-green border-accent-green/30 bg-accent-green/10";
  if (score >= 55) return "text-primary border-primary/30 bg-primary/10";
  if (score >= 40) return "text-text-muted border-text-muted/30 bg-text-muted/10";
  return "text-text-muted border-text-muted/30 bg-text-muted/10";
}

export function generateAffiliateUrl(
  platform: "amazon" | "flipkart",
  productId: string,
  tag: string
): string {
  if (platform === "amazon") {
    return `https://www.amazon.in/dp/${productId}?tag=${tag}`;
  }
  return `https://www.flipkart.com/product/p/itme?pid=${productId}&affid=${tag}`;
}

export function generatePriceHistory(days: number = 30): { date: string; price: number }[] {
  const history = [];
  const basePrice = 15000 + Math.random() * 50000;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.3;
    history.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(basePrice * (1 + variation)),
    });
  }

  return history;
}