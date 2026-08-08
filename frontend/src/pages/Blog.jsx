import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchPosts } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen">
      <SEO
        title="Culinary & Budget Journal"
        description="Read budget cooking guides, offline meal planning tips, and zero-food-waste recipe strategies from Bigger Nightingale Manufacturing."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold sage-badge">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Budget Culinary Insights</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            The Nightingale Journal
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Practical gastronomy, zero-waste pantry management, and the engineering behind offline recipe discovery.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-white animate-pulse border border-cream"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-cream shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-cream">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 text-charcoal backdrop-blur-md uppercase tracking-wider border border-gold/20 shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-muted font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-charcoal leading-snug hover:text-gold transition-colors">
                      <Link to={`/blog/${post.slug || post._id}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-cream/50 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
                    <User className="w-3.5 h-3.5 text-muted" />
                    <span>{post.author}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug || post._id}`}
                    className="text-xs font-semibold text-gold hover:text-gold-dark flex items-center gap-1 group"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
