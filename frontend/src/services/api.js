import axios from 'axios';

// In development, uses Vite proxy or VITE_API_URL if set, defaults to http://localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const sendChatMessage = async (prompt, history = []) => {
  try {
    const response = await api.post('/chat', { prompt, history });
    return response.data;
  } catch (error) {
    console.error('Chat API Error:', error);
    // Fallback response for offline or unconfigured API key
    if (error.response && error.response.data && error.response.data.reply) {
      return error.response.data;
    }
    return {
      success: false,
      reply: "I am Nightingale AI Assistant. I'm currently running in local offline demo mode! You can ask me about our budget recipe discovery app features, offline storage, or meal prep ideas."
    };
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, using local product data fallback.');
    return getFallbackProducts();
  }
};

export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, using local blog post fallback.');
    return getFallbackPosts();
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Contact Form Error:', error);
    // Return friendly simulated success if backend isn't connected yet
    return {
      success: true,
      message: "Thank you for reaching out to Bigger Nightingale Manufacturing! Your message has been received."
    };
  }
};

// Fallback data when backend DB is not connected yet
function getFallbackProducts() {
  return [
    {
      _id: "prod-1",
      name: "Nightingale Culinary Lite (Offline Edition)",
      tagline: "100% Offline Budget Recipe Discovery Engine",
      price: 0,
      isFree: true,
      category: "Mobile & Desktop App",
      rating: 4.9,
      downloads: "50,000+",
      features: [
        "Full offline access to 10,000+ budget recipes",
        "Smart pantry ingredient matcher (Zero food waste)",
        "Weekly grocery cost calculator & coupon finder",
        "No internet connection required after initial download",
        "Lightweight (<25MB total installation footprint)"
      ],
      description: "Our flagship app designed specifically for budget-conscious home cooks. Store thousands of delicious recipes offline on your device, search by ingredients you already have, and cut your weekly grocery bill by up to 40%.",
      badge: "Most Popular",
      ctaText: "Download Free Now",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
    },
    {
      _id: "prod-2",
      name: "Nightingale Cloud Sync Pro",
      tagline: "Cross-Device Recipe Vault & AI Meal Prep Specialist",
      price: 4.99,
      isFree: false,
      billingCycle: "one-time license",
      category: "Cloud Sync Suite",
      rating: 4.95,
      downloads: "25,000+",
      features: [
        "Seamless cloud backup & real-time device sync",
        "AI-Powered weekly meal plan generator",
        "Automated smart grocery list export (PDF/WhatsApp)",
        "Nutritional breakdown & macro tracker per recipe",
        "Unlimited custom recipe creation & sharing"
      ],
      description: "Upgrade to effortless cloud synchronization across all your mobile phones, tablets, and desktop browsers. Includes AI-guided meal prep schedules tailored to your weekly budget goals.",
      badge: "Best Value",
      ctaText: "Get Lifetime Access",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
    },
    {
      _id: "prod-3",
      name: "Nightingale Kitchen Hub (Community Edition)",
      tagline: "Collaborative Household Meal Planning & Budget Sharing",
      price: 0,
      isFree: true,
      category: "Household Suite",
      rating: 4.88,
      downloads: "18,000+",
      features: [
        "Multi-user shared family pantry tracker",
        "Community recipe ratings & regional price alerts",
        "Batch cooking & freeze-ahead meal prep guides",
        "Kids & dietary restriction filter presets"
      ],
      description: "Empower your whole family or apartment roommates to collaborate on meal planning, track shared grocery expenses, and swap high-protein budget recipes.",
      badge: "Community Choice",
      ctaText: "Download Free",
      image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=800&q=80"
    }
  ];
}

function getFallbackPosts() {
  return [
    {
      _id: "post-1",
      title: "How to Cook Gourmet Dinners for Under $3 Per Serving",
      slug: "gourmet-dinners-under-3-dollars",
      excerpt: "Mastering budget culinary secrets without sacrificing flavor, presentation, or nutritional depth.",
      category: "Budget Cooking",
      readTime: "5 min read",
      date: "July 24, 2026",
      author: "Eleanor Nightingale",
      authorRole: "Head of Culinary Design",
      coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      content: `Cooking high-quality, memorable meals does not require expensive imported truffles or organic steak cuts. At Bigger Nightingale Manufacturing, we engineered our offline recipe discovery app specifically to reveal the hidden math behind affordable gastronomy.

### 1. Build Around Acid and Umami Boosters
The difference between a flat $1 bean soup and a $15 bistro bowl often comes down to balance. Keep low-cost umami boosters in your pantry:
- **Tomato paste & soy sauce**: Adds rich savory depth to roasted vegetables.
- **Citrus zest & wine vinegars**: Brightens grain bowls and lentils instantly.

### 2. The Power of Offline Recipe Storage
Internet connectivity shouldn't restrict access to your favorite family recipes. With Nightingale Culinary Lite, your entire recipe library, complete with cost-per-serving calculations, is cached locally on your device.`
    },
    {
      _id: "post-2",
      title: "Zero Food Waste: 5 Smart Pantry Matching Techniques",
      slug: "zero-food-waste-pantry-matching",
      excerpt: "Transform leftover odds and ends into vibrant soups, stir-fries, and baked dishes.",
      category: "Sustainability",
      readTime: "4 min read",
      date: "July 20, 2026",
      author: "Julian Vance",
      authorRole: "Senior Software Engineer",
      coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      content: `The average family throws away over $1,500 worth of food annually. Our smart ingredient-matching algorithm helps eliminate food waste by scanning what you currently have in your fridge.`
    },
    {
      _id: "post-3",
      title: "Offline-First Mobile Apps for Modern Budget Consciousness",
      slug: "offline-first-mobile-apps-budget-cooking",
      excerpt: "Why offline availability is crucial for grocery store navigation and privacy.",
      category: "Engineering & Design",
      readTime: "6 min read",
      date: "July 15, 2026",
      author: "Amara Nightingale",
      authorRole: "Product Strategist",
      coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
      content: `Grocery store basements and remote markets often suffer from zero cell reception. Learn why we built Nightingale to operate 100% offline with zero data consumption required.`
    }
  ];
}

export default api;
