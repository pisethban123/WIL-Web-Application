import mongoose from "mongoose"; // Correct ES module import

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB; // Export the function as default
