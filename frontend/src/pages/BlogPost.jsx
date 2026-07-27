import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchPosts } from '../services/api';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const posts = await fetchPosts();
      const found = posts.find(p => p.slug === id || p._id === id) || posts[0];
      setPost(found);
      setLoading(false);
    };
    loadPost();
  }, [id]);

  if (loading || !post) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen bg-surface">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Journal Articles
        </Link>

        {/* Post Header */}
        <div className="space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold sage-badge uppercase tracking-wider">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-muted pt-2 border-b border-cream pb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gold" />
              <span className="font-semibold text-charcoal">{post.author}</span>
              <span>({post.authorRole || 'Culinary Specialist'})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sage-dark" />
              <span>{post.readTime}</span>
            </div>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-elevated border border-cream aspect-[16/9]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body Content */}
        <div className="prose prose-lg max-w-none text-charcoal font-sans leading-relaxed space-y-6 pt-4 text-sm sm:text-base">
          <p className="font-serif text-lg sm:text-xl italic text-muted border-l-4 border-gold pl-4 py-1">
            "{post.excerpt}"
          </p>

          <div className="whitespace-pre-line space-y-4">
            {post.content}
          </div>

          {/* Antigravity Banner Quote */}
          <div className="p-6 rounded-2xl bg-surface border border-cream shadow-soft my-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gold">
              <Sparkles className="w-4 h-4" />
              <span>Bigger Nightingale Culinary Motto</span>
            </div>
            <p className="font-serif font-bold text-base text-charcoal">
              "Big ideas, beautiful design. I am using Antigravity by the way."
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-cream flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sage-dark" />
            <span className="text-xs text-muted">Verified Recipe & Budget Strategy Article</span>
          </div>

          <Link
            to="/products"
            className="px-5 py-2.5 rounded-full bg-gold text-white text-xs font-semibold hover:bg-gold-dark transition-colors shadow-soft"
          >
            Try Free Recipe App
          </Link>
        </div>

      </article>
    </div>
  );
};

export default BlogPost;
