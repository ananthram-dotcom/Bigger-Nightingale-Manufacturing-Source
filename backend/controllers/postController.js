import Post from '../models/Post.js';

const mockPosts = [
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

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    if (posts && posts.length > 0) {
      return res.json(posts);
    }
    return res.json(mockPosts);
  } catch (error) {
    return res.json(mockPosts);
  }
};

export const getPostBySlugOrId = async (req, res) => {
  try {
    const post = await Post.findOne({ $or: [{ slug: req.params.id }, { _id: req.params.id }] });
    if (post) return res.json(post);
    const mock = mockPosts.find(p => p.slug === req.params.id || p._id === req.params.id);
    if (mock) return res.json(mock);
    return res.status(404).json({ message: 'Post not found' });
  } catch (error) {
    const mock = mockPosts.find(p => p.slug === req.params.id || p._id === req.params.id) || mockPosts[0];
    return res.json(mock);
  }
};
