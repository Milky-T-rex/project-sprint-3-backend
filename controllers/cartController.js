import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// เพิ่มสินค้าในตะกร้า
export const addItemToCart = async (req, res) => {
    try {
      const { productId, quantity, userId } = req.body; // รับ userId จาก body
  
      if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
  
      await cart.save();
      res.status(201).json({ message: 'Item added to cart', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
  };
  
// ดูตะกร้าสินค้าของผู้ใช้
export const getCart = async (req, res) => {
    try {
      const userId = req.query.userId || req.body.userId; // รับ userId จาก query หรือ body ชั่วคราว
      if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
      }
  
      const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
  };
  

// ลบสินค้าออกจากตะกร้า
export const removeItemFromCart = async (req, res) => {
    try {
      // ดึง userId และ productId จากคำขอ (query หรือ body)
      const { userId, productId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
      }
  
      if (!productId) {
        return res.status(400).json({ message: 'ProductId is required' });
      }
  
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // ค้นหา index ของสินค้าที่ต้องการลบ
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      // ลบสินค้าที่เจอออกจาก array
      cart.items.splice(itemIndex, 1);
  
      await cart.save();
  
      res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
  };
  