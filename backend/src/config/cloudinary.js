import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration du storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thelunch', // Dossier dans Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [
      { width: 800, height: 600, crop: 'fill' }, // Optimisation automatique
      { quality: 'auto' },
      { format: 'auto' }
    ],
  },
});

// Fonction pour supprimer une image
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// Fonction pour obtenir l'URL optimisée d'une image
export const getOptimizedUrl = (publicId, options = {}) => {
  const defaultOptions = {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  };
  
  return cloudinary.url(publicId, { ...defaultOptions, ...options });
};

export { cloudinary, storage };
export default cloudinary;