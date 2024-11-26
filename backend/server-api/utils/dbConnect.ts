import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connesso a MongoDB");
  } catch (error) {
    console.error("Errore di connessione a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
