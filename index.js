const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Firebase admin setup
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Google client (from Firebase console)
const CLIENT_ID = 'आपका-Google-Client-ID';  // बाद में यहां सही ID डालो
const client = new OAuth2Client(CLIENT_ID);

// Home route
app.get('/', (req, res) => {
  res.send('✅ Skill Swapper backend चल रहा है');
});

// Google login route
app.post('/api/google-login', async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const userData = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };

    res.json(userData);
  } catch (err) {
    console.error('❌ Token verify failed:', err);
    res.status(401).json({ error: 'Invalid ID token' });
  }
});

// Server run
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Skill Swapper backend port ${PORT} पर चल रहा है`);
});
