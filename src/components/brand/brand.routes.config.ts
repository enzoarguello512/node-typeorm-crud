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
 * POST: Add new brand
 */
router
  .route(`/`)
  .get(controller.listBrands)
  .post(
    body('name')
      .isString()
      .withMessage('Required field "name" of type "string"'),
    body('vehiclesId')
      .isArray()
      .withMessage('VehiclesId has to be an array of numbers(ids)')
      .isNumeric()
      .withMessage('VehiclesId only has to contain numbers (ids)')
      .optional(),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    controller.createBrand
  );

/**
 * PUT: Get all brands
 * GET: Add new brand
 * DELETE: Add new brand
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
      .isArray()
      .withMessage('VehiclesId has to be an array of numbers(ids)')
      .isNumeric()
      .withMessage('VehiclesId only has to contain numbers (ids)')
      .optional(),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    controller.updateBrandById
  )
  .get(controller.getBrandById)
  .delete(controller.removeBrandById);

export default router;
