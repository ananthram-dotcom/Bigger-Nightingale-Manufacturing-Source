import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Download, ChefHat } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Our Values', path: '/#values' },
    { name: 'Culinary Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-soft py-3 border-b border-cream' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-cream border border-gold/30 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 shadow-sm">
            <img src="/logo.svg" alt="Nightingale Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-charcoal flex items-center gap-1.5">
              Bigger Nightingale
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold"></span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-muted font-sans font-medium">
              Manufacturing
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path.startsWith('/#') && location.pathname === '/');
            return (
              <a
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-gold relative py-1 ${
                  isActive ? 'text-charcoal font-semibold' : 'text-charcoal/70'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal text-white text-xs font-semibold tracking-wide hover:bg-gold transition-all duration-300 shadow-soft hover:shadow-gold-glow group"
          >
            <Download className="w-3.5 h-3.5 text-gold group-hover:text-white transition-colors" />
            Get App Free
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-surface transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-cream shadow-elevated overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-serif text-charcoal hover:text-gold transition-colors py-2 border-b border-surface"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-dark transition-colors shadow-soft"
                >
                  <Download className="w-4 h-4" />
                  Get Nightingale App Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
