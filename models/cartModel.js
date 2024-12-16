import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // เชื่อมโยงกับ User
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product', // เชื่อมโยงกับ Product
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true, // เก็บราคาของสินค้า ณ เวลาที่เพิ่มเข้าตะกร้า
      },
      total: {
        type: Number,
        required: true, // เก็บผลรวมของราคาต่อชิ้น * จำนวน
      },
    },
  ],
  shipping: { type: Number, default: 5.99 }, // ค่าขนส่งเริ่มต้น
  tax: { type: Number, default: 6.40 }, // ค่าภาษีเริ่มต้น
  totalPrice: { type: Number, required: true, default: 0 }, // ราคารวมทั้งหมด
  updatedAt: {
    type: Date,
    default: Date.now, // เวลาที่ตะกร้าถูกอัปเดตล่าสุด
  },
});

// Middleware: คำนวณ `total` และ `totalPrice` ก่อนบันทึก
cartSchema.pre('save', function (next) {
  this.items.forEach((item) => {
    item.total = item.price * item.quantity; // คำนวณราคาย่อยของแต่ละสินค้า
  });

  // คำนวณราคารวมของสินค้าในตะกร้า
  const itemsTotal = this.items.reduce((sum, item) => sum + item.total, 0);
  
  // รวมค่า shipping และ tax
  this.totalPrice = itemsTotal + this.shipping + this.tax;

  this.updatedAt = new Date(); // อัปเดตเวลาที่แก้ไข
  next();
});


const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
