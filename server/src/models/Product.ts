import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: string;
  image: string;
  description: string;
  features: string[];
  category: 'premium' | 'mid-range' | 'entry';
  stock?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please provide a brand'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price must be positive'],
    },
    year: {
      type: String,
      required: [true, 'Please provide a year'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    features: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ['premium', 'mid-range', 'entry'],
      required: [true, 'Please provide a category'],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ProductSchema.index({ brand: 1, year: 1, category: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);

