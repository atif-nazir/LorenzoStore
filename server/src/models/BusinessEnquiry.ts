import mongoose, { Document, Schema } from 'mongoose';

export interface IBusinessEnquiry extends Document {
  enquiryType: 'wholesale' | 'sponsorship' | 'distribution' | 'partnership';
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  status: 'pending' | 'reviewing' | 'contacted' | 'rejected' | 'approved';
  createdAt: Date;
  updatedAt: Date;
}

const BusinessEnquirySchema = new Schema<IBusinessEnquiry>(
  {
    enquiryType: {
      type: String,
      enum: ['wholesale', 'sponsorship', 'distribution', 'partnership'],
      required: [true, 'Please select an enquiry type'],
    },
    companyName: {
      type: String,
      required: [true, 'Please provide your company name'],
      trim: true,
    },
    contactName: {
      type: String,
      required: [true, 'Please provide your contact name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Please provide your country'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'contacted', 'rejected', 'approved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBusinessEnquiry>('BusinessEnquiry', BusinessEnquirySchema);

