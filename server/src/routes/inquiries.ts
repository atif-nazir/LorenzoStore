import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Inquiry from '../models/Inquiry';
import Product from '../models/Product';
import { protect, isAdmin } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Create new inquiry
// @access  Public
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('message').optional().trim(),
    body('productId').optional().trim(),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const inquiryData: any = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      };

      // If productId is provided, find the product by id field or MongoDB _id
      if (req.body.productId) {
        let product = await Product.findOne({ id: req.body.productId });
        if (!product) {
          // Try MongoDB _id
          product = await Product.findById(req.body.productId);
        }
        if (product) {
          inquiryData.productId = product._id;
        }
      }

      const inquiry = await Inquiry.create(inquiryData);

      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data: inquiry,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Private/Admin
router.get('/', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('productId', 'name brand price image')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/inquiries/:id
// @desc    Get single inquiry
// @access  Private/Admin
router.get('/:id', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate('productId', 'name brand price image');

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status
// @access  Private/Admin
router.put(
  '/:id/status',
  protect,
  isAdmin,
  [
    body('status').isIn(['pending', 'contacted', 'resolved']).withMessage('Invalid status'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const inquiry = await Inquiry.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      ).populate('productId', 'name brand price image');

      if (!inquiry) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }

      res.json({
        success: true,
        data: inquiry,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

