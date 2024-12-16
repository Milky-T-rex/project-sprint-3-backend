import express from 'express';
import { addItemToCart, checkout, getCart, removeItemFromCart } from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/utilities.js';

const cartRouter = express.Router();

// เพิ่มสินค้าในตะกร้า
cartRouter.post('/',authenticateToken, addItemToCart);

// ดูตะกร้าสินค้าของผู้ใช้
cartRouter.get('/',authenticateToken, getCart);

// ลบสินค้าออกจากตะกร้า
cartRouter.delete('/',authenticateToken, removeItemFromCart);

cartRouter.post('/checkout',authenticateToken, checkout); 

export default cartRouter;
