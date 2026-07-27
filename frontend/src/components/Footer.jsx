import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, WifiOff } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface text-charcoal border-t border-cream pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-cream">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-gold/30 flex items-center justify-center p-1.5 shadow-sm">
                <img src="/logo.svg" alt="Nightingale Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif font-bold text-xl text-charcoal">
                Bigger Nightingale Manufacturing
              </span>
            </div>
            
            <p className="text-sm text-muted leading-relaxed max-w-md">
              We empower budget-conscious culinary enthusiasts with intelligent, 100% offline & cloud recipe discovery technology. Fine dining economics made accessible to everyone.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-gold">
              <Sparkles className="w-4 h-4" />
              <span>"Big ideas, beautiful design. I am using Antigravity by the way."</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-base mb-4 text-charcoal">App Solutions</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link to="/products" className="hover:text-gold transition-colors flex items-center gap-2">
                  <WifiOff className="w-3.5 h-3.5 text-sage" />
                  Nightingale Lite (Offline)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Cloud Sync Pro
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Household Family Suite
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors">
                  Zero Food Waste Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="font-serif font-semibold text-base mb-4 text-charcoal">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href="/#values" className="hover:text-gold transition-colors">Our Values</a></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Culinary Journal</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Support</Link></li>
              <li>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium sage-badge mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Tier Ready
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>© {new Date().getFullYear()} Bigger Nightingale Manufacturing. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Terms of Service</span>
            <span className="flex items-center gap-1 text-charcoal font-medium">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for budget cooks.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
