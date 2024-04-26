import mongoose from "mongoose";

const connectDB = async () => {
  try {                                    
    // const conn = await mongoose.connect()
    await mongoose.connect("mongodb+srv://rohitsharma4102002:89Ids6R6fy7LM6dK@cluster0.r4gcbuh.mongodb.net/offense-management-system");
    console.log(`Mongodb connected ${mongoose.connection.host}:${mongoose.connection.port}`);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`);
  }
};

export default connectDB;
