import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Milky-T-rex`);
    console.log("เชื่อมต่อ MongoDB สำเร็จ ✅");
  } catch (error) {
    console.error("การเชื่อมต่อ MongoDB ล้มเหลว ❌", error);
    process.exit(1); // หยุดเซิร์ฟเวอร์เมื่อเชื่อมต่อล้มเหลว
  }
};

export default connectDB;
