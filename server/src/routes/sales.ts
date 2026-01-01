import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult, query } from 'express-validator';
import Sale from '../models/Sale';
import { protect, isAdmin } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/sales
// @desc    Create new sale
// @access  Private/Admin
router.post(
  '/',
  protect,
  isAdmin,
  [
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('customerName').trim().notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Please provide a valid email'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('unitPrice').isFloat({ min: 0 }).withMessage('Unit price must be positive'),
    body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be positive'),
    body('status').optional().isIn(['completed', 'pending', 'cancelled']).withMessage('Invalid status'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const sale = await Sale.create(req.body);

      res.status(201).json({
        success: true,
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/sales
// @desc    Get all sales (with optional filters)
// @access  Private/Admin
router.get(
  '/',
  protect,
  isAdmin,
  [
    query('startDate').optional().isISO8601().withMessage('Invalid start date'),
    query('endDate').optional().isISO8601().withMessage('Invalid end date'),
    query('status').optional().isIn(['completed', 'pending', 'cancelled']).withMessage('Invalid status'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate, status } = req.query;

      // Build filter
      const filter: any = {};
      if (startDate || endDate) {
        filter.saleDate = {};
        if (startDate) filter.saleDate.$gte = new Date(startDate as string);
        if (endDate) filter.saleDate.$lte = new Date(endDate as string);
      }
      if (status) filter.status = status;

      const sales = await Sale.find(filter)
        .populate('productId', 'name brand price image')
        .sort({ saleDate: -1 });

      res.json({
        success: true,
        count: sales.length,
        data: sales,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/sales/stats
// @desc    Get sales statistics
// @access  Private/Admin
router.get('/stats', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;

    // Build date filter
    const dateFilter: any = {};
    if (startDate) dateFilter.$gte = new Date(startDate as string);
    if (endDate) dateFilter.$lte = new Date(endDate as string);

    const matchFilter: any = { status: 'completed' };
    if (Object.keys(dateFilter).length > 0) {
      matchFilter.saleDate = dateFilter;
    }

    // Get total sales
    const totalSalesResult = await Sale.aggregate([
      { $match: matchFilter },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].total : 0;

    // Get monthly sales (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlySales = await Sale.aggregate([
      {
        $match: {
          status: 'completed',
          saleDate: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$saleDate' },
            month: { $month: '$saleDate' },
          },
          total: { $sum: '$totalAmount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Get daily sales (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailySales = await Sale.aggregate([
      {
        $match: {
          status: 'completed',
          saleDate: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$saleDate' },
            month: { $month: '$saleDate' },
            day: { $dayOfMonth: '$saleDate' },
          },
          total: { $sum: '$totalAmount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalSales,
        monthlySales,
        dailySales,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/sales/:id
// @desc    Get single sale
// @access  Private/Admin
router.get('/:id', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('productId', 'name brand price image');

    if (!sale) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }

    res.json({
      success: true,
      data: sale,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/sales/:id
// @desc    Update sale
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  isAdmin,
  [
    body('status').optional().isIn(['completed', 'pending', 'cancelled']).withMessage('Invalid status'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate('productId', 'name brand price image');

      if (!sale) {
        return res.status(404).json({ success: false, message: 'Sale not found' });
      }

      res.json({
        success: true,
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   DELETE /api/sales/:id
// @desc    Delete sale
// @access  Private/Admin
router.delete('/:id', protect, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }

    res.json({
      success: true,
      message: 'Sale deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

