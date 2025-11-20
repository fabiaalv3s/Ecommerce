import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { body } from 'express-validator';

const router = Router();
const productController = new ProductController();

// Validation rules
const productValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

// Routes
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', authenticate, authorize('admin'), productValidation, productController.create);
router.put('/:id', authenticate, authorize('admin'), productController.update);
router.delete('/:id', authenticate, authorize('admin'), productController.delete);

export { router as productRoutes };




