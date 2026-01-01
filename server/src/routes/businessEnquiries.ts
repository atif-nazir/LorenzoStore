import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import BusinessEnquiry from '../models/BusinessEnquiry';
import { protect, isAdmin } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/business-enquiries
// @desc    Create new business enquiry
// @access  Public
router.post(
  '/',
  [
    body('enquiryType')
      .isIn(['wholesale', 'sponsorship', 'distribution', 'partnership'])
      .withMessage('Invalid enquiry type'),
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('contactName').trim().notEmpty().withMessage('Contact name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('country').trim().notEmpty().withMessage('Country is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const businessEnquiry = await BusinessEnquiry.create(req.body);

      res.status(201).json({
        success: true,
        message: 'Business enquiry submitted successfully',
        data: businessEnquiry,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/business-enquiries
// @desc    Get all business enquiries
// @access  Private/Admin
router.get('/', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const businessEnquiries = await BusinessEnquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: businessEnquiries.length,
      data: businessEnquiries,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/business-enquiries/:id
// @desc    Get single business enquiry
// @access  Private/Admin
router.get('/:id', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const businessEnquiry = await BusinessEnquiry.findById(req.params.id);

    if (!businessEnquiry) {
      return res.status(404).json({ success: false, message: 'Business enquiry not found' });
    }

    res.json({
      success: true,
      data: businessEnquiry,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/business-enquiries/:id/status
// @desc    Update business enquiry status
// @access  Private/Admin
router.put(
  '/:id/status',
  protect,
  isAdmin,
  [
    body('status')
      .isIn(['pending', 'reviewing', 'contacted', 'rejected', 'approved'])
      .withMessage('Invalid status'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const businessEnquiry = await BusinessEnquiry.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );

      if (!businessEnquiry) {
        return res.status(404).json({ success: false, message: 'Business enquiry not found' });
      }

      res.json({
        success: true,
        data: businessEnquiry,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

