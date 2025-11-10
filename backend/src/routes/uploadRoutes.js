import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configuration Multer pour la mémoire (pas de stockage local)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    // Vérifier le type de fichier
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image sont autorisés'), false);
    }
  }
});

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private (Admin)
router.post('/image', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    console.log('Upload route hit');
    console.log('File received:', !!req.file);
    console.log('User:', req.user);
    
    // Debug: Vérifier les variables d'environnement
    console.log('Environment variables:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? '***set***' : 'not set',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '***set***' : 'not set'
    });
    
    if (!req.file) {
      console.log('No file provided');
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier image fourni'
      });
    }

    console.log('File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Reconfigurer Cloudinary juste avant l'upload
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Convertir le buffer en base64 pour l'upload vers Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload vers Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(dataURI, {
      folder: 'thelunch',
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 600, crop: 'fill' },
        { quality: 'auto' },
        { format: 'auto' }
      ]
    });

    console.log('Cloudinary upload successful:', {
      public_id: cloudinaryResult.public_id,
      secure_url: cloudinaryResult.secure_url
    });

    res.status(200).json({
      success: true,
      message: 'Image uploadée avec succès',
      data: {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error message:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'upload: ' + error.message
    });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private (Admin)
router.post('/images', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier image fourni'
      });
    }

    const uploadedImages = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname,
      size: file.size
    }));

    res.status(200).json({
      success: true,
      message: `${req.files.length} image(s) uploadée(s) avec succès`,
      data: uploadedImages
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'upload des images'
    });
  }
});

// @desc    Delete image
// @route   DELETE /api/upload/image/:publicId
// @access  Private (Admin)
router.delete('/image/:publicId', authMiddleware, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID requis'
      });
    }

    // Décodage de l'ID public (au cas où il serait encodé)
    const decodedPublicId = decodeURIComponent(publicId);
    
    const result = await deleteImage(decodedPublicId);
    
    if (result.result === 'ok' || result.result === 'not found') {
      res.status(200).json({
        success: true,
        message: 'Image supprimée avec succès',
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'image'
      });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression'
    });
  }
});

// @desc    Get image info
// @route   GET /api/upload/image/:publicId/info
// @access  Private (Admin)
router.get('/image/:publicId/info', authMiddleware, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Récupération des informations de l'image depuis Cloudinary
    const result = await cloudinary.api.resource(publicId);
    
    res.status(200).json({
      success: true,
      data: {
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        size: result.bytes,
        url: result.secure_url,
        createdAt: result.created_at
      }
    });
  } catch (error) {
    if (error.http_code === 404) {
      return res.status(404).json({
        success: false,
        message: 'Image non trouvée'
      });
    }
    
    console.error('Get image info error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des informations'
    });
  }
});

// Middleware d'erreur pour Multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Fichier trop volumineux (max 10MB)'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Trop de fichiers (max 10)'
      });
    }
  }
  
  if (error.message === 'Seuls les fichiers image sont autorisés') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Erreur serveur lors de l\'upload'
  });
});

export default router;