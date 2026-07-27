import mongoose from 'mongoose';
import dns from 'dns';

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore
}

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes('<username>')) {
    console.log('⚠️ MONGO_URI is missing or unconfigured in backend/.env.');
    console.log('ℹ️ Backend is operating in hybrid mode with rich local fallback data!');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('ℹ️ Falling back to in-memory/mock data endpoints.');
    return false;
  }
};
