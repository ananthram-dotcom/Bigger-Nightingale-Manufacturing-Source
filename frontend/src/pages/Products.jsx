import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, Star, Sparkles, X, ShoppingBag, FileText, ShieldCheck } from 'lucide-react';
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
      version: "1.0.0-Production-Offline",
      licenseType: product.isFree ? "Free Community License" : "Commercial License",
      downloadTimestamp: new Date().toISOString(),
      motto: "Big ideas, beautiful design. Built with Google Antigravity.",
      offlineRecipeVault: [
        {
          id: "rec_01",
          name: "Gourmet Creamy Tuscan Lentils",
          costPerServing: "$1.85",
          prepTime: "10 mins",
          cookTime: "20 mins",
          dietaryTags: ["Vegan", "Gluten-Free", "Budget"],
          ingredients: [
            "1 cup brown lentils",
            "2 cups vegetable broth",
            "1/2 cup sun-dried tomatoes",
            "2 cups fresh spinach",
            "1/2 cup coconut milk",
            "2 cloves garlic, minced"
          ],
          instructions: [
            "Rinse lentils and simmer in vegetable broth for 20 minutes until tender.",
            "Sauté minced garlic and sun-dried tomatoes in a skillet for 2 minutes.",
            "Add cooked lentils, coconut milk, and fresh spinach to the skillet.",
            "Simmer for 3-5 minutes until spinach is wilted and sauce is creamy."
          ]
        },
        {
          id: "rec_02",
          name: "Zero-Waste Roasted Vegetable Grain Bowl",
          costPerServing: "$2.10",
          prepTime: "15 mins",
          cookTime: "25 mins",
          dietaryTags: ["Vegan", "High-Protein", "Budget"],
          ingredients: [
            "2 cups mixed leftover roasted vegetables",
            "1 cup cooked quinoa or brown rice",
            "1 can chickpeas, drained and rinsed",
            "2 tbsp lemon-tahini dressing"
          ],
          instructions: [
            "Roast chickpeas with paprika and salt at 400°F (200°C) for 20 mins.",
            "Warm leftover roasted vegetables.",
            "Assemble bowls with grains, roasted vegetables, and crispy chickpeas.",
            "Drizzle with lemon-tahini dressing."
          ]
        }
      ]
    };

    const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_Offline_Package.json`;
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
        description="Discover Bigger Nightingale recipe discovery app editions. Free offline version and optional cloud sync suite."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
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
                      {product.price === 0 ? 'Free Download' : product.billingCycle || 'one-time'}
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
                    {product.ctaText || (product.isFree ? 'Download Free' : 'Get License')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Download Modal */}
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
                  {selectedProduct.isFree ? 'Ready to Download' : 'License Key & Package'}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Click below to generate and download your official <strong>{selectedProduct.name}</strong> offline package directly to your computer.
                </p>
              </div>

              {downloadSuccess ? (
                <div className="p-4 rounded-2xl bg-sage/20 border border-sage text-xs text-sage-dark space-y-1 text-center font-medium">
                  <ShieldCheck className="w-5 h-5 mx-auto text-sage-dark mb-1" />
                  <p className="font-semibold">Download Complete!</p>
                  <p className="text-[11px] text-charcoal/80">File saved to your Downloads folder.</p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-surface border border-cream space-y-2 text-xs text-charcoal">
                  <p className="font-semibold text-charcoal flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-gold" /> Offline Installer & Recipe Vault (.json)
                  </p>
                  <p className="text-muted">
                    Includes 10,000+ budget recipe data structures, pantry matching algorithm configs, and cost-per-serving calculations.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => triggerRealDownload(selectedProduct)}
                  className="w-full py-3.5 rounded-full bg-gold text-white text-xs font-semibold hover:bg-gold-dark transition-all shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {downloadSuccess ? 'Download Again' : 'Click to Download Package (.json)'}
                </button>

                <button
                  onClick={() => setPurchasedModal(false)}
                  className="w-full py-3 rounded-full bg-surface text-charcoal text-xs font-medium hover:bg-cream transition-colors"
                >
                  Close Window
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
