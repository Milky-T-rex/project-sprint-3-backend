import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from '../controllers/productController.js';

const productRouter = express.Router();

// GET - แสดงสินค้าทั้งหมด
productRouter.get('/', getAllProducts);
// GET - แสดงสินค้าตาม ID
productRouter.get('/:id', getProductById);
// ดึงสินค้าตามหมวดหมู่
productRouter.get("/category/:category", getProductsByCategory);
// POST - เพิ่มสินค้าใหม่
productRouter.post('/', createProduct);
// PUT - แก้ไขสินค้า
productRouter.put('/:id', updateProduct);
// DELETE - ลบสินค้า
productRouter.delete('/:id', deleteProduct);

export default productRouter;
