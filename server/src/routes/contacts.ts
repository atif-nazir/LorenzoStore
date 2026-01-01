import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact';
import { protect, isAdmin } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/contacts
// @desc    Create new contact message
// @access  Public
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const contact = await Contact.create(req.body);

      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/contacts
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/contacts/:id
// @desc    Get single contact message
// @access  Private/Admin
router.get('/:id', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/contacts/:id/status
// @desc    Update contact status
// @access  Private/Admin
router.put(
  '/:id/status',
  protect,
  isAdmin,
  [
    body('status').isIn(['pending', 'replied', 'resolved']).withMessage('Invalid status'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );

      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact message not found' });
      }

      res.json({
        success: true,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

