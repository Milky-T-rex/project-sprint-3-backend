import mongoose from "mongoose";

// สร้าง Schema สำหรับเก็บ Token
const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // เก็บ userId เพื่อเชื่อมโยงกับผู้ใช้
  token: { type: String, required: true }, // เก็บ Token
  createdAt: { type: Date, default: Date.now }, // เวลาที่สร้าง Token
  expiresAt: { type: Date, required: true }, // วันหมดอายุของ Token
});

// สร้าง Model จาก Schema
const tokenModel = mongoose.models.token ||mongoose.model('token', tokenSchema);

export default tokenModel;