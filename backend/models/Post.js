import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'Budget Cooking' },
  readTime: { type: String, default: '5 min read' },
  date: { type: String, default: () => new Date().toLocaleDateString() },
  author: { type: String, default: 'Nightingale Culinary Team' },
  authorRole: { type: String, default: 'Recipe Strategist' },
  coverImage: { type: String, required: true },
  tags: [{ type: String }]
}, {
  timestamps: true
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
