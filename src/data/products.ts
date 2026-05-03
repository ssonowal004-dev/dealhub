import { Product, Category } from "@/lib/types";
import { calculateDealScore, generatePriceHistory, generateAffiliateUrl } from "@/lib/utils";

const categories: Category[] = [
  { id: "all", name: "All Deals", icon: "LayoutGrid", productCount: 48 },
  { id: "electronics", name: "Electronics", icon: "Smartphone", productCount: 15 },
  { id: "laptops", name: "Laptops", icon: "Laptop", productCount: 8 },
  { id: "fashion", name: "Fashion", icon: "Shirt", productCount: 10 },
  { id: "home", name: "Home & Kitchen", icon: "Home", productCount: 7 },
  { id: "beauty", name: "Beauty", icon: "Sparkles", productCount: 5 },
  { id: "sports", name: "Sports", icon: "Dumbbell", productCount: 3 },
];

const productTemplates = [
  {
    name: "iPhone 15 Pro Max",
    description: "Titanium design, A17 Pro chip, 48MP camera system with 5x telephoto zoom. The most powerful iPhone ever.",
    basePrice: 159900,
    category: "electronics",
    platform: "amazon" as const,
    rating: 4.6,
    reviewCount: 12543,
    features: ["A17 Pro Chip", "48MP Camera", "5x Telephoto", "Titanium Build"],
    deliveryTime: "1-2 days",
    tags: ["trending", "premium"],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "AI-powered smartphone with S Pen, 200MP camera, and Galaxy AI features for smarter productivity.",
    basePrice: 129999,
    category: "electronics",
    platform: "flipkart" as const,
    rating: 4.5,
    reviewCount: 8921,
    features: ["200MP Camera", "S Pen", "Galaxy AI", "5000mAh Battery"],
    deliveryTime: "2-3 days",
    tags: ["trending", "ai-powered"],
  },
  {
    name: "MacBook Air M3",
    description: "Supercharged by M3 chip, up to 18 hours battery life, stunning Liquid Retina display.",
    basePrice: 114900,
    category: "laptops",
    platform: "amazon" as const,
    rating: 4.8,
    reviewCount: 3421,
    features: ["M3 Chip", "18hr Battery", "Liquid Retina", "Silent Design"],
    deliveryTime: "1-2 days",
    tags: ["bestseller", "premium"],
  },
  {
    name: "Dell XPS 15",
    description: "Premium laptop with InfinityEdge display, Intel Core i7, and NVIDIA GeForce RTX graphics.",
    basePrice: 189990,
    category: "laptops",
    platform: "flipkart" as const,
    rating: 4.3,
    reviewCount: 2156,
    features: ["Intel i7", "RTX Graphics", "InfinityEdge", "CNC Aluminum"],
    deliveryTime: "3-4 days",
    tags: ["premium", "creator"],
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation, 30-hour battery, crystal clear hands-free calling.",
    basePrice: 29990,
    category: "electronics",
    platform: "amazon" as const,
    rating: 4.7,
    reviewCount: 18765,
    features: ["ANC", "30hr Battery", "Multipoint", "LDAC"],
    deliveryTime: "1 day",
    tags: ["bestseller", "audio"],
  },
  {
    name: "Nike Air Jordan 1 High",
    description: "Iconic basketball shoe with premium leather, Air cushioning, and timeless style.",
    basePrice: 14995,
    category: "fashion",
    platform: "flipkart" as const,
    rating: 4.4,
    reviewCount: 5678,
    features: ["Premium Leather", "Air Cushioning", "Iconic Design", "Durable"],
    deliveryTime: "2-3 days",
    tags: ["trending", "streetwear"],
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced health sensors, Double Tap gesture, brighter display, and carbon neutral options.",
    basePrice: 45900,
    category: "electronics",
    platform: "amazon" as const,
    rating: 4.6,
    reviewCount: 9876,
    features: ["Double Tap", "Health Sensors", "Always-On", "Water Resistant"],
    deliveryTime: "1-2 days",
    tags: ["health", "smartwatch"],
  },
  {
    name: "Dyson V15 Detect",
    description: "Laser reveals microscopic dust, intelligently optimizes suction, up to 60 minutes run time.",
    basePrice: 52900,
    category: "home",
    platform: "flipkart" as const,
    rating: 4.5,
    reviewCount: 3241,
    features: ["Laser Detection", "60min Runtime", "HEPA Filter", "LCD Screen"],
    deliveryTime: "2-4 days",
    tags: ["premium", "home"],
  },
  {
    name: "Kindle Paperwhite",
    description: "6.8 inch glare-free display, adjustable warm light, 10 weeks battery life, waterproof.",
    basePrice: 13999,
    category: "electronics",
    platform: "amazon" as const,
    rating: 4.7,
    reviewCount: 45632,
    features: ["6.8 inch Display", "Warm Light", "10 Week Battery", "Waterproof"],
    deliveryTime: "1 day",
    tags: ["bestseller", "reading"],
  },
  {
    name: "Levi's 511 Slim Fit Jeans",
    description: "Modern slim fit with stretch denim, classic five-pocket styling, and signature Levi's quality.",
    basePrice: 3499,
    category: "fashion",
    platform: "flipkart" as const,
    rating: 4.2,
    reviewCount: 12345,
    features: ["Stretch Denim", "Slim Fit", "Classic Style", "Durable"],
    deliveryTime: "2-3 days",
    tags: ["classic", "everyday"],
  },
  {
    name: "Philips Air Fryer HD9252",
    description: "Rapid Air technology for healthy frying, digital touchscreen, 4.1L capacity, dishwasher safe.",
    basePrice: 8999,
    category: "home",
    platform: "amazon" as const,
    rating: 4.4,
    reviewCount: 28765,
    features: ["Rapid Air", "Digital Touch", "4.1L Capacity", "Dishwasher Safe"],
    deliveryTime: "1-2 days",
    tags: ["bestseller", "healthy"],
  },
  {
    name: "Canon EOS R50",
    description: "Mirrorless camera with 24.2MP sensor, 4K video, Dual Pixel CMOS AF II, and compact design.",
    basePrice: 64990,
    category: "electronics",
    platform: "flipkart" as const,
    rating: 4.6,
    reviewCount: 1876,
    features: ["24.2MP", "4K Video", "Dual Pixel AF", "Compact"],
    deliveryTime: "2-3 days",
    tags: ["creator", "camera"],
  },
  {
    name: "L'Oreal Paris Revitalift",
    description: "Anti-aging serum with hyaluronic acid, pro-retinol, and vitamin C for radiant skin.",
    basePrice: 899,
    category: "beauty",
    platform: "amazon" as const,
    rating: 4.3,
    reviewCount: 45678,
    features: ["Hyaluronic Acid", "Pro-Retinol", "Vitamin C", "Anti-Aging"],
    deliveryTime: "1 day",
    tags: ["skincare", "popular"],
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra thick 8mm TPE yoga mat, non-slip surface, eco-friendly, with carrying strap.",
    basePrice: 1299,
    category: "sports",
    platform: "flipkart" as const,
    rating: 4.5,
    reviewCount: 9876,
    features: ["8mm Thick", "Non-Slip", "Eco-Friendly", "Carrying Strap"],
    deliveryTime: "2-3 days",
    tags: ["fitness", "yoga"],
  },
  {
    name: "Bose QuietComfort Ultra",
    description: "Immersive audio with CustomTune technology, world-class noise cancellation, premium comfort.",
    basePrice: 34900,
    category: "electronics",
    platform: "amazon" as const,
    rating: 4.6,
    reviewCount: 5432,
    features: ["CustomTune", "ANC", "24hr Battery", "Spatial Audio"],
    deliveryTime: "1-2 days",
    tags: ["premium", "audio"],
  },
];

function generateProducts(): Product[] {
  return productTemplates.map((template, index) => {
    const discountPercent = Math.floor(Math.random() * 40) + 10;
    const price = Math.round(template.basePrice * (1 - discountPercent / 100));
    const priceHistory = generatePriceHistory();
    const maxHistoricalPrice = Math.max(...priceHistory.map((p) => p.price));
    const priceDrop = ((maxHistoricalPrice - price) / maxHistoricalPrice) * 100;

    return {
      id: `prod-${index + 1}`,
      name: template.name,
      description: template.description,
      price,
      originalPrice: template.basePrice,
      discount: discountPercent,
      image: `https://images.unsplash.com/photo-${[
        "1511707171634-5f897ff02aa9",
        "1592899677977-9c10ca588bbd",
        "1517336714731-489689fd1ca4",
        "1593642632823-8f78536788c6",
        "1505740420929-4d417977b1f7",
        "1542291026-7eec264c27ff",
        "1434493789847-2f02dc6ca35d",
        "1558618666-fcd25c85f82f",
        "1544716278-ca5e3f4abd8c",
        "1521572167774-30f95d1bbe3b",
        "1585776245991-cf89dd7fc73a",
        "1516035069371-29a1b244cc32",
        "1596462502278-27bfdd403348",
        "1599447421405-0c1a518992d3",
        "1546435770-a3e426bf472b",
      ][index]}?w=600&h=600&fit=crop`,
      category: template.category,
      platform: template.platform,
      rating: template.rating,
      reviewCount: template.reviewCount,
      affiliateUrl: generateAffiliateUrl(template.platform, `B0${index}XYZ${index}`, "dealhub0a-21"),
      dealScore: calculateDealScore(discountPercent, template.rating, template.reviewCount, priceDrop),
      priceHistory,
      features: template.features,
      inStock: Math.random() > 0.1,
      deliveryTime: template.deliveryTime,
      tags: template.tags,
    };
  });
}

export const products: Product[] = generateProducts();
export { categories };

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === "all") return products;
  return products.filter((p) => p.category === categoryId);
}

export function getTrendingProducts(): Product[] {
  return products
    .filter((p) => p.tags.includes("trending") || p.dealScore >= 75)
    .sort((a, b) => b.dealScore - a.dealScore)
    .slice(0, 6);
}

export function getBestDeals(): Product[] {
  return [...products]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 6);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}
