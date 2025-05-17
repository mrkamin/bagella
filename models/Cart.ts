import  { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      productCode: {
    type: String,
    required: [true, "Product must have a product code."],
    unique: true,
  },
    },
  ],
});

const Cart = models.Cart || model("Cart", CartSchema);
export default Cart;
