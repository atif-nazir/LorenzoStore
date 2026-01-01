import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult, query } from 'express-validator';
import Product from '../models/Product';
import { protect, isAdmin } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products (with optional filters)
// @access  Public
router.get(
  '/',
  [
    query('brand').optional().trim(),
    query('year').optional().trim(),
    query('category').optional().isIn(['premium', 'mid-range', 'entry']),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { brand, year, category } = req.query;

      // Build filter
      const filter: any = { isActive: true };
      if (brand) filter.brand = brand;
      if (year) filter.year = year;
      if (category) filter.category = category;

      const products = await Product.find(filter).sort({ createdAt: -1 });

      res.json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Try to find by MongoDB _id first, then by product id field
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      product = await Product.findOne({ id: req.params.id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private/Admin
router.post(
  '/',
  protect,
  isAdmin,
  [
    body('id').trim().notEmpty().withMessage('Product ID is required'),
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('brand').trim().notEmpty().withMessage('Brand is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('year').trim().notEmpty().withMessage('Year is required'),
    body('image').trim().notEmpty().withMessage('Image URL is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').isIn(['premium', 'mid-range', 'entry']).withMessage('Invalid category'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const product = await Product.create(req.body);

      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  isAdmin,
  [
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').optional().isIn(['premium', 'mid-range', 'entry']).withMessage('Invalid category'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      let product = await Product.findById(req.params.id);
      
      if (!product) {
        product = await Product.findOne({ id: req.params.id });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      product = await Product.findByIdAndUpdate(product._id, req.body, {
        new: true,
        runValidators: true,
      });

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      product = await Product.findOne({ id: req.params.id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Soft delete by setting isActive to false
    await Product.findByIdAndUpdate(product._id, { isActive: false });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

