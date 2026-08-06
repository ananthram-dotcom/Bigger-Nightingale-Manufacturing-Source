import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, Star, Sparkles, X, Smartphone, FileText, ShieldCheck, Laptop } from 'lucide-react';
import SEO from '../components/SEO';
import DietaryFilter from '../components/DietaryFilter';
import ServingScaler from '../components/ServingScaler';
import { fetchProducts } from '../services/api';
import { useStore } from '../store/useStore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchasedModal, setPurchasedModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const { dietaryFilter } = useStore();

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
    setDownloadSuccess(false);
  };

  const triggerRealDownload = (product) => {
    const packageData = {
      appTitle: "Bigger Nightingale Manufacturing — Budget Recipe Engine",
      productName: product.name,
      version: "1.0.0-Production-PWA",
      installationType: "Progressive Web App (PWA) Direct Browser Install",
      downloadTimestamp: new Date().toISOString(),
      motto: "Big ideas, beautiful design. Built with Google Antigravity.",
      sampleOfflineVault: [
        {
          id: "rec_01",
          name: "Gourmet Creamy Tuscan Lentils",
          costPerServing: "$1.85",
          prepTime: "10 mins",
          cookTime: "20 mins",
          ingredients: [
            "1 cup brown lentils",
            "2 cups vegetable broth",
            "1/2 cup sun-dried tomatoes",
            "2 cups fresh spinach",
            "1/2 cup coconut milk"
          ]
        }
      ]
    };

    const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_Sample_Vault.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
  };

  const filteredProducts = products.filter((product) => {
    if (dietaryFilter === 'All') return true;
    if (dietaryFilter === 'Budget') return product.price === 0 || product.price < 5;
    return product.features?.some((f) => f.toLowerCase().includes(dietaryFilter.toLowerCase()));
  });

  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen">
      <SEO
        title="App Editions & Pricing"
        description="Discover Bigger Nightingale recipe discovery app editions. Free PWA app version and optional cloud sync suite."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold sage-badge">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant PWA Installation — 100% Free</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            Nightingale App Editions
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Nightingale runs directly as a Progressive Web App (PWA). No `.exe` or `.apk` file download needed!
          </p>
        </div>

        {/* Dietary Filter & Serving Scaler Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <DietaryFilter />
          <ServingScaler baseServings={2} />
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
            {filteredProducts.map((product) => (
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

                  <div className="py-3 border-y border-cream flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-bold text-charcoal">
                      {product.price === 0 ? '$0' : `$${product.price}`}
                    </span>
                    <span className="text-xs text-muted">
                      {product.price === 0 ? 'Free PWA Install' : product.billingCycle || 'one-time'}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {product.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal">
                        <Check className="w-4 h-4 text-sage-dark flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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
                    {product.ctaText || (product.isFree ? 'Install PWA App' : 'Get License')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Clear & Honest Installation Modal */}
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
                <Laptop className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-2xl text-charcoal">
                  Direct Web & PWA Install
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  <strong>Bigger Nightingale</strong> runs as a modern Progressive Web App (PWA). You do not need a separate `.exe` or `.apk` download file!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-cream space-y-3 text-xs text-charcoal">
                <div className="flex items-center gap-2 font-semibold text-gold">
                  <Smartphone className="w-4 h-4" /> How to Install to Home Screen:
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-muted leading-relaxed text-[11px]">
                  <li>Look at your browser's top address bar.</li>
                  <li>Click the <strong>"Install App" / Star icon</strong>.</li>
                  <li>Enjoy instant full desktop & mobile home screen access with offline caching!</li>
                </ol>
              </div>

              {downloadSuccess ? (
                <div className="p-3 rounded-xl bg-sage/20 border border-sage text-xs text-sage-dark text-center font-medium">
                  <ShieldCheck className="w-4 h-4 mx-auto text-sage-dark mb-0.5" />
                  <p>Sample Recipe Database (.json) Downloaded!</p>
                </div>
              ) : null}

              <div className="space-y-2.5">
                <button
                  onClick={() => triggerRealDownload(selectedProduct)}
                  className="w-full py-3.5 rounded-full bg-charcoal text-white text-xs font-semibold hover:bg-gold transition-all shadow-soft flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-gold" />
                  Download Sample Recipe Vault (.json)
                </button>

                <button
                  onClick={() => setPurchasedModal(false)}
                  className="w-full py-2.5 rounded-full bg-surface text-charcoal text-xs font-medium hover:bg-cream transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
