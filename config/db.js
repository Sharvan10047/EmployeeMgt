import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log(`Database connected successfully ${mongoose.connection.host}`)    
  } catch (error) {
    console.error('Database connection failed')
  }
}
export default connectDB