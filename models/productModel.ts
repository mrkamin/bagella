import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have name."],
  },
  price: {
    type: Number,
    required: [true, "Product must have price."],
  },
  image: {
    type: String,
    required: [true, "Product must have image."],
  },
  description: {
    type: String,
    required: [true, "Product must have description."],
  },
  productCode: {
    type: String,
    required: [true, "Product must have a product code."],
    unique: true,
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema, "products");

export default Product;
