import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, Star, WifiOff, Cloud, Users, Shield, Sparkles, X, ShoppingBag } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchProducts } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchasedModal, setPurchasedModal] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleAction = (product) => {
    setSelectedProduct(product);
    setPurchasedModal(true);
  };

  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen">
      <SEO
        title="App Editions & Pricing"
        description="Discover Bigger Nightingale recipe discovery app editions. Free offline version and optional cloud sync suite."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold sage-badge">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free Core Access Forever</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            Nightingale App Editions
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Choose the recipe discovery solution tailored to your kitchen routine and grocery budget goals.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-white animate-pulse border border-cream"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-3xl p-8 border flex flex-col justify-between shadow-soft hover:shadow-elevated transition-all relative ${
                  product.badge === 'Most Popular' ? 'border-gold ring-1 ring-gold/30' : 'border-cream'
                }`}
              >
                {product.badge && (
                  <span className={`absolute -top-3.5 left-8 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    product.badge === 'Most Popular' ? 'bg-gold text-white shadow-sm' : 'bg-charcoal text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}

                <div className="space-y-6">
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted font-medium uppercase tracking-wider">{product.category}</span>
                      <div className="flex items-center gap-1 text-gold text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-gold" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-2xl text-charcoal">{product.name}</h3>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{product.tagline}</p>
                  </div>

                  {/* Pricing */}
                  <div className="py-3 border-y border-cream flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-bold text-charcoal">
                      {product.price === 0 ? '$0' : `$${product.price}`}
                    </span>
                    <span className="text-xs text-muted">
                      {product.price === 0 ? 'Free Download' : product.billingCycle || 'one-time'}
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3">
                    {product.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal">
                        <Check className="w-4 h-4 text-sage-dark flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-8">
                  <button
                    onClick={() => handleAction(product)}
                    className={`w-full py-3.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      product.isFree
                        ? 'bg-charcoal text-white hover:bg-gold shadow-soft'
                        : 'bg-gold text-white hover:bg-gold-dark shadow-gold-glow'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    {product.ctaText || (product.isFree ? 'Download Free' : 'Get License')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {purchasedModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-elevated border border-cream space-y-6"
            >
              <button
                onClick={() => setPurchasedModal(false)}
                className="absolute top-6 right-6 p-1.5 text-muted hover:text-charcoal rounded-full hover:bg-surface"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-cream text-gold flex items-center justify-center border border-gold/30">
                <ShoppingBag className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-2xl text-charcoal">
                  {selectedProduct.isFree ? 'Download Started!' : 'Select Payment Method'}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Thank you for choosing <strong>{selectedProduct.name}</strong> from Bigger Nightingale Manufacturing.
                </p>
              </div>

              {selectedProduct.isFree ? (
                <div className="p-4 rounded-2xl bg-surface border border-cream space-y-2 text-xs text-charcoal">
                  <p className="font-semibold text-sage-dark flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Package Ready (Offline Installer)
                  </p>
                  <p className="text-muted">
                    Your lightweight offline installation file (~22 MB) is generating. No internet connection will be needed after installation.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-surface border border-cream space-y-3 text-xs">
                  <div className="flex items-center justify-between text-charcoal font-semibold">
                    <span>One-time License Fee:</span>
                    <span className="text-gold font-serif text-lg">${selectedProduct.price}</span>
                  </div>
                  <p className="text-muted">
                    Instant lifetime license key and cloud sync credentials will be issued upon transaction confirmation.
                  </p>
                </div>
              )}

              <button
                onClick={() => setPurchasedModal(false)}
                className="w-full py-3.5 rounded-full bg-charcoal text-white text-xs font-semibold hover:bg-gold transition-colors shadow-soft"
              >
                Close & Return
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
