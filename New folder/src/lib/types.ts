export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  platform: "amazon" | "flipkart";
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  dealScore: number;
  priceHistory: PricePoint[];
  features: string[];
  inStock: boolean;
  deliveryTime: string;
  tags: string[];
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
}

export interface AlertSubscription {
  productId: string;
  email: string;
  targetPrice: number;
  createdAt: string;
}