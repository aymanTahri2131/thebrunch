import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
    trim: true
  },
  quantity: {
    type: String,
    default: '',
    trim: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: '/images/default-product.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Category ID is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  icon: {
    type: String,
    required: [true, 'Category icon is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  products: [productSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const lunchMenuSchema = new mongoose.Schema({
  categories: [categorySchema],
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better performance (categories.id already has unique index)
lunchMenuSchema.index({ 'categories.products.name': 1 });

// Virtual for active categories
lunchMenuSchema.virtual('activeCategories').get(function() {
  return this.categories.filter(cat => cat.isActive);
});

// Method to get category by ID
lunchMenuSchema.methods.getCategoryById = function(categoryId) {
  return this.categories.find(cat => cat.id === categoryId);
};

// Static method to get active menu
lunchMenuSchema.statics.getActiveMenu = function() {
  return this.findOne({ isActive: true }).sort({ updatedAt: -1 });
};

export default mongoose.model('LunchMenu', lunchMenuSchema);