import Link from "next/link";
import { Zap, Github, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: ["All Deals", "Trending", "Best Sellers", "New Arrivals"],
    Categories: ["Electronics", "Laptops", "Fashion", "Home & Kitchen", "Beauty"],
    Support: ["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">DealHub</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm mb-6">
              Your smart shopping companion. We curate the best deals from Amazon 
              and Flipkart so you never miss a great offer. All purchases are redirected 
              to official stores.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-surface-light border border-border flex items-center justify-center 
                           text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-text mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {currentYear} DealHub. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            This site contains affiliate links. We earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}