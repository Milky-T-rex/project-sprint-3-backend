import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',  // เชื่อมโยงกับ User
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',  // เชื่อมโยงกับ Product
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: {
    type: String,
    enum: ['Pending Payment', 'Paid', 'Cancelled'],
    default: 'Pending Payment',  // สถานะเริ่มต้นคือ "รอการชำระเงิน"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
