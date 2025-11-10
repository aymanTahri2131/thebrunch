import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxlength: [100, 'Menu item name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [300, 'Description cannot exceed 300 characters']
  }
}, {
  _id: false
});

const reveillonMenuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Menu title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
    trim: true
  },
  image: {
    type: String,
    default: '/images/default-reveillon.jpg'
  },
  imageAlt: {
    type: String,
    required: [true, 'Image alt text is required'],
    trim: true,
    maxlength: [200, 'Alt text cannot exceed 200 characters']
  },
  items: [String],
  lastItem: {
    type: String,
    trim: true
  },
  isPremium: {
    type: Boolean,
    default: true
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

const reveillonMenuSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Carte Spéciale Réveillon',
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    default: 'Pour des fêtes gourmandes réussies',
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  plateaux: [reveillonMenuItemSchema],
  seasonStartDate: {
    type: Date,
    default: () => new Date('2024-12-01')
  },
  seasonEndDate: {
    type: Date,
    default: () => new Date('2025-01-15')
  },
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

// Index for better performance
reveillonMenuSchema.index({ 'plateaux.title': 1 });
reveillonMenuSchema.index({ isActive: 1 });

// Virtual for active plateaux
reveillonMenuSchema.virtual('activePlateaux').get(function() {
  return this.plateaux.filter(plateau => plateau.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
});

// Method to get plateau by title
reveillonMenuSchema.methods.getPlateauByTitle = function(title) {
  return this.plateaux.find(plateau => plateau.title === title);
};

// Static method to get active reveillon menu
reveillonMenuSchema.statics.getActiveMenu = function() {
  return this.findOne({ isActive: true }).sort({ updatedAt: -1 });
};

export default mongoose.model('ReveillonMenu', reveillonMenuSchema);