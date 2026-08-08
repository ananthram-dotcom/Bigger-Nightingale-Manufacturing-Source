import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Download, WifiOff, HeartHandshake, ShieldCheck, DollarSign, Utensils, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="pt-24 pb-16">
      <SEO
        title="Offline & Cloud Budget Recipe Discovery App"
        description="Bigger Nightingale Manufacturing builds cloud and 100% offline recipe apps for budget-conscious food lovers. Big ideas, beautiful design."
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-surface to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold sage-badge">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Created for Budget-Conscious Gourmets</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-charcoal">
              Big Ideas, <br />
              <span className="gold-gradient-text">Beautiful Design.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              Meet <strong>Bigger Nightingale</strong> — the revolutionary culinary app operating 100% offline and in the cloud. Save up to 40% on weekly grocery bills while cooking restaurant-grade meals.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-cream shadow-soft flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold font-serif text-lg">
                NG
              </div>
              <p className="text-xs text-charcoal font-medium italic">
                "Big ideas, beautiful design. I am using Antigravity by the way."
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/products"
                className="px-7 py-3.5 rounded-full bg-charcoal text-white text-sm font-semibold hover:bg-gold transition-all duration-300 shadow-soft hover:shadow-gold-glow text-center flex items-center justify-center gap-2 group"
              >
                <Download className="w-4 h-4 text-gold group-hover:text-white transition-colors" />
                Explore Free App Editions
              </Link>
              <a
                href="#values"
                className="px-7 py-3.5 rounded-full border border-cream bg-white text-charcoal text-sm font-semibold hover:bg-surface transition-all text-center flex items-center justify-center gap-2"
              >
                Our Core Values
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-cream">
              <div>
                <span className="font-serif font-bold text-2xl text-charcoal">10,000+</span>
                <p className="text-[11px] text-muted uppercase font-medium">Budget Recipes</p>
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-gold">100%</span>
                <p className="text-[11px] text-muted uppercase font-medium">Offline Ready</p>
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-sage-dark">$0</span>
                <p className="text-[11px] text-muted uppercase font-medium">Free Tier Forever</p>
              </div>
            </div>
          </motion.div>

          {/* High-Key Culinary Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
                alt="Bigger Nightingale Budget Recipe Prep"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel text-charcoal shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                      <WifiOff className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-sm">Offline Pantry Matcher</h4>
                      <p className="text-[11px] text-muted">Zero internet required at grocery stores</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold text-white uppercase">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Engineered for Practical Gastronomy
            </h2>
            <p className="text-sm text-muted">
              Why thousands of budget cooks rely on Bigger Nightingale every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-cream hover:border-gold/30 transition-all duration-300 shadow-soft hover:shadow-elevated space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-gold border border-gold/20 flex items-center justify-center shadow-sm">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-charcoal">100% Offline Vault</h3>
              <p className="text-sm text-muted leading-relaxed">
                Access your complete recipe library, pantry inventory, and shopping lists without relying on Wi-Fi or cellular networks.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-cream hover:border-gold/30 transition-all duration-300 shadow-soft hover:shadow-elevated space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-sage text-sage-dark border border-sage/20 flex items-center justify-center shadow-sm">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-charcoal">Budget Optimizer</h3>
              <p className="text-sm text-muted leading-relaxed">
                Cost-per-serving calculations let you plan weekly meals down to the penny. Eat like royalty while staying strictly within your financial goals.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-cream hover:border-gold/30 transition-all duration-300 shadow-soft hover:shadow-elevated space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-charcoal border border-charcoal/20 flex items-center justify-center shadow-sm">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-charcoal">Zero Waste Matching</h3>
              <p className="text-sm text-muted leading-relaxed">
                Input your leftover ingredients into our smart engine to instantly receive delicious, tested recipes that use what you already own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Section: OUR VALUES */}
      <section id="values" className="py-20 bg-surface border-y border-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Philosophy & Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Our Core Values
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              At Bigger Nightingale Manufacturing, we believe that high-quality technology and delicious food should be accessible to all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value 1: Kindness & Elegance */}
            <div className="bg-white p-8 rounded-2xl border border-cream shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-full bg-cream text-gold flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal">Luxurious & Kind</h3>
              <p className="text-xs text-muted leading-relaxed">
                We design elegant interfaces without dark patterns or aggressive paywalls. Our app respects user time, budget limits, and attention.
              </p>
            </div>

            {/* Value 2: Complete Accessibility */}
            <div className="bg-white p-8 rounded-2xl border border-cream shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-full bg-cream text-sage-dark flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal">100% Free Access</h3>
              <p className="text-xs text-muted leading-relaxed">
                Our core recipe discovery features are free forever. No required subscriptions to access thousands of nourishing meals.
              </p>
            </div>

            {/* Value 3: Offline Freedom */}
            <div className="bg-white p-8 rounded-2xl border border-cream shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-full bg-cream text-charcoal flex items-center justify-center">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal">Offline Sovereignty</h3>
              <p className="text-xs text-muted leading-relaxed">
                Your data stays local on your device. Never worry about weak internet connectivity at grocery markets or rural kitchens.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Required Section: PURCHASE CTA */}
      <section className="py-20 bg-charcoal text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gold/20 text-gold border border-gold/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join 90,000+ Budget Cooks</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Ready to Revolutionize Your <br />
            <span className="text-gold">Weekly Culinary Budget?</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Download <strong>Nightingale Culinary Lite</strong> for free, or unlock <strong>Cloud Sync Pro</strong> for seamless cross-device backup.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Get Nightingale Lite (Free)
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white text-sm font-semibold border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              View All App Packages
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
