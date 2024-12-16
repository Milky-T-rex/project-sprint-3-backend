// controllers/cartController.js
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// คำนวณ totalPrice ของตะกร้า
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.total, 0);
};

// เพิ่มสินค้าในตะกร้า
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // ถ้าไม่พบ Cart ของผู้ใช้ ให้สร้างใหม่ โดยไม่ต้องระบุค่า shipping และ tax
      cart = new Cart({
        userId,
        items: [],
        totalPrice: 0, // กำหนดค่าเริ่มต้นให้ totalPrice
      });
    }

    // ดึงข้อมูลสินค้า
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการเพิ่ม" });
    }

    const { price } = product;

    if (!price || isNaN(price)) {
      return res
        .status(400)
        .json({ message: "สินค้าไม่มีข้อมูลราคา หรือราคาผิดพลาด" });
    }

    // ตรวจสอบสินค้าซ้ำในตะกร้า
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // อัปเดตจำนวนและ total ของสินค้าใน Cart
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].total =
        cart.items[existingItemIndex].quantity * price;
    } else {
      // เพิ่มสินค้าใหม่
      cart.items.push({ productId, quantity, price, total: quantity * price });
    }

    // คำนวณราคารวมของสินค้าทั้งหมด
    const itemsTotal = cart.items.reduce((sum, item) => sum + item.total, 0);

    // คำนวณราคารวมทั้งหมด (รวมสินค้าพร้อมค่าขนส่งและภาษี)
    cart.totalPrice = itemsTotal + cart.shipping + cart.tax;

    // บันทึก Cart
    await cart.save();
    res.status(201).json({ message: "เพิ่มสินค้าลงในตะกร้าสำเร็จ", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};


// ดูตะกร้าสินค้าของผู้ใช้
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // คำนวณ totalPrice ของตะกร้า
    cart.totalPrice = calculateTotalPrice(cart.items);

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

// ลบสินค้าออกจากตะกร้า
export const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    // คำนวณ totalPrice ของตะกร้าใหม่
    cart.totalPrice = calculateTotalPrice(cart.items);

    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
};

// checkout
export const checkout = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ message: "ไม่พบสินค้าหรือตะกร้าว่างเปล่า" });
    }

    // คำนวณ totalPrice ของตะกร้า
    const totalPrice = calculateTotalPrice(cart.items);

    // สร้างคำสั่งซื้อ
    const order = new Order({
      userId,
      items: cart.items,
      totalPrice,
      status: "Pending Payment",
      createdAt: new Date(),
    });

    await order.save();

    // ล้างข้อมูลในตะกร้า
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res
      .status(200)
      .json({ message: "บันทึกคำสั่งซื้อสำเร็จ รอการชำระเงิน", order });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ",
        error: error.message,
      });
  }
};
