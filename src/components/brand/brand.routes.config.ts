import express from 'express';
import { BrandsController } from './controllers/brand.controller';
import BrandsMiddleware from './middleware/brand.middleware';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

// Misc
const router = express.Router();
const controller = new BrandsController();

/**
 * GET: Get all brands
 * POST: Add a new brand
 */
router
  .route(`/`)
  .get(controller.listBrands)
  .post(
    body('name')
      .isString()
      .withMessage('Required field "name" of type "string"'),
    body('vehiclesId')
      .toArray()
      .isNumeric()
      .withMessage('VehiclesId has to be an array of numbers(ids)')
      .optional(),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    controller.createBrand
  );

/**
 * PUT: Update a brand
 * GET: Find an individual brand
 * DELETE: Delete a brand
 */
router.param(`brandId`, BrandsMiddleware.extractBrandId);
router
  .route(`/:brandId`)
  .all(
    body('id')
      .toInt()
      .isInt({ gt: 0 })
      .withMessage(
        '/api/brand/:brandId (id) must be a number greater than zero'
      ),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    BrandsMiddleware.validateBrandExists
  )
  .put(
    body('name').isString().withMessage('Name has to be a string').optional(),
    body('vehiclesId')
      .toArray()
      .isNumeric()
      .withMessage('VehiclesId has to be an array of numbers(ids)')
      .optional(),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    controller.updateBrandById
  )
  .get(controller.getBrandById)
  .delete(controller.removeBrandById);

export default router;
