import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true }, // بدلنا من String لـ Number
  quantity: { type: String, trim: true },
  items: { type: Array, default: [] },
  lastItem: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
});

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  products: { type: [ProductSchema], default: [] },
  plateaux: { type: Array, default: [] },
});

const LunchMenuSchema = new mongoose.Schema({
  categories: { type: [CategorySchema], default: [] },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('LunchMenu', LunchMenuSchema);
