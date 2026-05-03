# DealHub - Affiliate Marketing Website

A modern, dark-themed affiliate marketing platform that automatically curates and displays products from Amazon and Flipkart. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Features

- **Auto-Sync Products**: Ready for Amazon PA API and Flipkart API integration
- **Unique Dark UI**: Glassmorphism design with gradient accents
- **Price Tracking**: Visual price history charts for each product
- **Deal Score Algorithm**: AI-inspired scoring system based on discount, rating, and price drops
- **Price Drop Alerts**: Users can set target prices and get email notifications
- **Category Filtering**: Browse products by category with animated filters
- **Smart Search**: Full-text search across products, categories, and tags
- **Responsive Design**: Fully responsive from mobile to desktop
- **Affiliate Redirect**: Direct users to official Amazon/Flipkart stores with your affiliate tags
- **SEO Optimized**: Server-side rendering with Next.js App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, stats, trending & best deals |
| All Deals | `/deals` | Filterable product grid with sorting |
| Trending | `/trending` | Hot products and trending stats |
| Categories | `/categories` | Browse by category |
| Product Detail | `/product/[id]` | Full product info, price chart, alerts |
| Search | `/search?q=` | Search results page |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd affiliate-website

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Affiliate Integration

### Amazon Associates
1. Sign up at [Amazon Associates](https://affiliate-program.amazon.in/)
2. Get your Associate Tag (e.g., `dealhub0a-21`)
3. Replace the tag in `src/lib/utils.ts` → `generateAffiliateUrl()`
4. Use Amazon Product Advertising API (PA API) for auto-sync

### Flipkart Affiliate
1. Sign up at [Flipkart Affiliate](https://affiliate.flipkart.com/)
2. Get your Affiliate ID
3. Replace in the affiliate URL generator
4. Use Flipkart API or deal feeds for product sync

### Auto-Sync Setup

The current implementation uses sample data. To enable real auto-sync:

1. **Amazon**: Integrate PA API v5 for product search and details
2. **Flipkart**: Use their affiliate API or implement web scraping with Puppeteer/Playwright
3. Set up cron jobs (GitHub Actions, Vercel Cron, or node-cron) to sync every 6-12 hours
4. Store fetched data in your database (PostgreSQL/MongoDB)

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- `primary`: Main brand color (default: Indigo)
- `accent`: Highlight color (default: Amber)
- `background`: Dark background
- `surface`: Card backgrounds

### Products
Edit `src/data/products.ts` to:
- Add/remove product templates
- Change sample data
- Modify categories
- Update affiliate URLs

## Legal Compliance

- **Affiliate Disclosure**: Automatically displayed on all product pages
- **Privacy Policy**: Add your own privacy policy page
- **Terms of Service**: Add terms page
- **GDPR/CCPA**: Ensure compliance with data protection laws

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- **Netlify**: Connect GitHub repo
- **Railway**: Deploy with Dockerfile
- **AWS**: Use ECS or Elastic Beanstalk

## License

MIT License - feel free to use for commercial projects.

---

Built with ❤️ for smart shoppers everywhere.
