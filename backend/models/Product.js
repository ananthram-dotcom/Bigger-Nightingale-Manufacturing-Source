import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  isFree: { type: Boolean, default: true },
  billingCycle: { type: String, default: 'one-time' },
  category: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  downloads: { type: String, default: '10,000+' },
  features: [{ type: String }],
  description: { type: String, required: true },
  badge: { type: String, default: '' },
  ctaText: { type: String, default: 'Download Free' },
  image: { type: String, required: true }
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
