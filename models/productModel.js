import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  ingredients: { type: [String], required: true },
  taste: { type: String, required: true },
  id: { type: Number, required: true },
  price: { type: Number, required: true },  // เพิ่ม price
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
