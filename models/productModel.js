// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: { 
    type: String,
    required: true },
  image: {
    type: String,  // URL หรือ path ของรูปภาพ
    required: false,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
