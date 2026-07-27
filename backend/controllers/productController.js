import Product from '../models/Product.js';

const mockProducts = [
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

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products && products.length > 0) {
      return res.json(products);
    }
    return res.json(mockProducts);
  } catch (error) {
    return res.json(mockProducts);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    const mock = mockProducts.find(p => p._id === req.params.id);
    if (mock) return res.json(mock);
    return res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    const mock = mockProducts.find(p => p._id === req.params.id) || mockProducts[0];
    return res.json(mock);
  }
};
