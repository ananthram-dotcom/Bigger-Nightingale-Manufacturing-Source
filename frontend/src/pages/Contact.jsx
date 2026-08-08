import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, HeartHandshake } from 'lucide-react';
import SEO from '../components/SEO';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContactForm(formData);
      setSubmitted(true);
      setStatusMsg(res.message || 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch {
      setStatusMsg('There was an issue sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-surface min-h-screen">
      <SEO
        title="Contact Us & Support"
        description="Get in touch with Bigger Nightingale Manufacturing. Submit feedback, request offline app features, or contact support."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold sage-badge">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            Connect With Bigger Nightingale
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Have a question about our offline recipe discovery app or want to suggest new budget meal prep features? Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* Info Side Panel */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-cream shadow-soft space-y-6">
              <h3 className="font-serif font-bold text-xl text-charcoal">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs text-muted">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block">Email Support</span>
                    <span>support@nightingale-culinary.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream text-sage-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block">Live AI Chat</span>
                    <span>Available 24/7 via bottom-right floating widget</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream text-charcoal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-white fill-charcoal" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block">Headquarters</span>
                    <span>Bigger Nightingale Manufacturing HQ, Culinary Tech Plaza</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cream">
                <p className="font-serif italic text-xs text-charcoal font-medium">
                  "Big ideas, beautiful design. I am using Antigravity by the way."
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-cream shadow-soft">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-sage/20 text-sage-dark flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-charcoal">
                    Message Received!
                  </h3>
                  <p className="text-xs text-muted max-w-md mx-auto">
                    {statusMsg}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs font-semibold hover:bg-gold transition-colors shadow-soft"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                        className="w-full bg-surface border border-cream rounded-xl px-4 py-3 text-xs text-charcoal focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full bg-surface border border-cream rounded-xl px-4 py-3 text-xs text-charcoal focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-surface border border-cream rounded-xl px-4 py-3 text-xs text-charcoal focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Offline App Feature Request">Offline App Feature Request</option>
                      <option value="Cloud Sync Support">Cloud Sync Support</option>
                      <option value="Partnership / Press">Partnership / Press</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your feedback, question, or feature idea..."
                      className="w-full bg-surface border border-cream rounded-xl px-4 py-3 text-xs text-charcoal focus:outline-none focus:border-gold transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-charcoal text-white text-xs font-semibold hover:bg-gold transition-all duration-300 shadow-soft hover:shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold" />
                        Submit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
