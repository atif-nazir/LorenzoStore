import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISale extends Document {
  productId: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  saleDate: Date;
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const SaleSchema = new Schema<ISale>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Please provide a product ID'],
    },
    customerName: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Please provide customer email'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide quantity'],
      min: [1, 'Quantity must be at least 1'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Please provide unit price'],
      min: [0, 'Price must be positive'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Please provide total amount'],
      min: [0, 'Total amount must be positive'],
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'cancelled'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
SaleSchema.index({ saleDate: -1, status: 1 });
SaleSchema.index({ productId: 1 });

export default mongoose.model<ISale>('Sale', SaleSchema);

