import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Enquiry from './models/Enquiry.js';

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Energy Care API' }));

app.post('/api/enquiries', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Name, email, phone and project details are required.' });
  }
  if (mongoose.connection.readyState === 1) {
    await Enquiry.create({ name, email, phone, message });
  } else {
    console.log(`New enquiry from ${name} (${email}) — MongoDB is not connected`);
  }
  return res.status(201).json({ message: 'Enquiry received. Our team will contact you shortly.' });
});

app.listen(port, async () => {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
    }
  } else {
    console.log('MONGODB_URI not set; enquiries will be logged only');
  }
  console.log(`Energy Care API running on http://localhost:${port}`);
});
