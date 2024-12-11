import express from 'express';
import { addItemToCart, getCart, removeItemFromCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

// เพิ่มสินค้าในตะกร้า
cartRouter.post('/', addItemToCart);

// ดูตะกร้าสินค้าของผู้ใช้
cartRouter.get('/', getCart);

// ลบสินค้าออกจากตะกร้า
cartRouter.delete('/', removeItemFromCart);

export default cartRouter;
