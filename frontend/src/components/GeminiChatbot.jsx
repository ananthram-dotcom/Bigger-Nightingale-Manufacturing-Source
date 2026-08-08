import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Greetings! I am the Nightingale Culinary Assistant. Ask me anything about budget-friendly recipes, zero-food-waste tips, or our offline app!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Handle Escape key to close dialog for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgText = input.trim();
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== 1)
        .slice(-6)
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const res = await sendChatMessage(userMsgText, history);

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: res.reply || "I am here to assist with your culinary and budget planning questions!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "I am having trouble connecting to my recipe knowledge base right now. You can still explore our offline app features!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-label="Open Nightingale AI Culinary Assistant"
            className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-charcoal text-white shadow-elevated border border-gold/40 hover:bg-gold transition-all duration-300 group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-inner">
                <img src="/logo.svg" alt="Nightingale AI Logo" className="w-full h-full object-contain" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-sage rounded-full border-2 border-charcoal animate-pulse"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-gold group-hover:text-white transition-colors flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Nightingale AI
              </span>
              <span className="text-[11px] text-white/80 group-hover:text-white font-medium">
                Ask Recipe & Budget AI
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Accessible Floating Chat Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Nightingale AI Culinary Assistant Dialog"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[90vw] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-elevated border border-cream flex flex-col overflow-hidden glass-panel"
          >
            {/* Header */}
            <div className="bg-charcoal text-white px-5 py-4 flex items-center justify-between border-b border-gold/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white p-1 border border-gold/50 flex items-center justify-center">
                  <img src="/logo.svg" alt="AI Assistant" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-white flex items-center gap-1.5">
                    Nightingale AI Chef
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-gold/30 text-gold uppercase tracking-wider font-sans font-bold">
                      Gemini 1.5
                    </span>
                  </h3>
                  <p className="text-[11px] text-white/60">Cloud & Offline Culinary Guide</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Minimize Chat Assistant"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-surface/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-cream border border-gold/30 flex items-center justify-center p-1 flex-shrink-0 mt-0.5">
                      <img src="/logo.svg" alt="AI" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gold text-white rounded-br-none shadow-sm'
                      : 'bg-white text-charcoal border border-cream rounded-bl-none shadow-soft'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className={`text-[9px] block mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/80' : 'text-muted'
                    }`}>
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-charcoal text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-muted py-2 px-3 bg-white/70 rounded-xl w-fit border border-cream shadow-sm">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />
                  <span>Nightingale AI is thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-cream flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about budget recipes or app..."
                aria-label="Type your culinary question"
                className="flex-1 bg-surface border border-cream rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message to AI assistant"
                className="p-2.5 bg-charcoal text-white rounded-xl hover:bg-gold disabled:opacity-40 disabled:hover:bg-charcoal transition-all shadow-sm"
              >
                <Send className="w-4 h-4 text-gold hover:text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeminiChatbot;
