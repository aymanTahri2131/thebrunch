require('dotenv').config();
const twilio = require('twilio');

// Validation des variables d'environnement
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  throw new Error('Variables Twilio manquantes dans .env');
}

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

console.log('🔧 Twilio configuré pour WhatsApp sandbox');
console.log('📱 Numéro de destination:', process.env.WHATSAPP_TO_NUMBER);

module.exports = client;