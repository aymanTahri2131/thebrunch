import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuration Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Test de connexion WhatsApp
router.get('/test-whatsapp', async (req, res) => {
  try {
    const testMessage = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.WHATSAPP_TO_NUMBER,
      body: '🧪 Test de connexion WhatsApp - TheBrunch Traiteur\n\nSi vous recevez ce message, la configuration fonctionne parfaitement ! ✅'
    });

    console.log('✅ Message de test envoyé:', testMessage.sid);
    
    res.json({
      success: true,
      message: 'Message de test envoyé avec succès !',
      messageSid: testMessage.sid
    });

  } catch (error) {
    console.error('❌ Erreur test WhatsApp:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur : ' + error.message
    });
  }
});

// Envoyer un message WhatsApp depuis le formulaire de contact
router.post('/whatsapp', async (req, res) => {
  try {
    const { message, customerPhone, customerName, customerEmail } = req.body;

    console.log('💬 Nouveau message WhatsApp de:', customerName || 'Anonyme');

    const formattedMessage = `
🔔 *Nouveau Contact - TheBrunch Traiteur*

👤 *Client :* ${customerName || 'Nom non fourni'}
📧 *Email :* ${customerEmail || 'Email non fourni'}
📱 *Tél :* ${customerPhone || 'Téléphone non fourni'}

💬 *Message :*
${message}

---
🕐 Reçu le ${new Date().toLocaleString('fr-FR')}
🌐 Depuis le site web TheBrunch
    `.trim();

    // Envoyer vers votre numéro WhatsApp
    const whatsappMessage = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM, // whatsapp:+14155238886
      to: process.env.WHATSAPP_TO_NUMBER,     // whatsapp:+212708003458
      body: formattedMessage
    });

    console.log('✅ WhatsApp envoyé avec succès:', whatsappMessage.sid);

    res.status(200).json({
      success: true,
      message: 'Message WhatsApp envoyé !',
      messageSid: whatsappMessage.sid
    });

  } catch (error) {
    console.error('❌ Erreur WhatsApp:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur WhatsApp : ' + error.message
    });
  }
});

// Endpoint pour le formulaire de contact (envoi par WhatsApp)
router.post('/contact', async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      subject, 
      message,
      eventType,
      eventDate,
      guestCount 
    } = req.body;

    console.log('📧 Nouveau contact reçu de:', customerName);

    // Message formaté pour WhatsApp
    const formattedMessage = `
📧 *Contact Formulaire - TheBrunch*

👤 *Nom :* ${customerName}
📧 *Email :* ${customerEmail}
📱 *Tél :* ${customerPhone || 'Non fourni'}
📝 *Sujet :* ${subject || 'Contact général'}

🎉 *Type événement :* ${eventType || 'Non précisé'}
📅 *Date événement :* ${eventDate || 'Non précisée'}
👥 *Nombre invités :* ${guestCount || 'Non précisé'}

💌 *Message :*
${message}

---
🕐 ${new Date().toLocaleString('fr-FR')}
🌐 Formulaire de contact
    `.trim();

    // Envoyer par WhatsApp
    const whatsappMessage = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.WHATSAPP_TO_NUMBER,
      body: formattedMessage
    });

    console.log('✅ Contact envoyé via WhatsApp:', whatsappMessage.sid);

    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès !'
    });

  } catch (error) {
    console.error('❌ Erreur contact:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur : ' + error.message
    });
  }
});

export default router;