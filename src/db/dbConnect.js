import mongoose from 'mongoose';

const MONGODB_URI =  "mongodb+srv://emergency:emergency@prathampshetty99sai.j4iophu.mongodb.net/altius?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    })
    console.log("db connected")
    
  }
  catch (error) {
    console.error(error);
  }}

export default dbConnect;
