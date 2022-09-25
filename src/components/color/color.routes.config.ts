import express from 'express';
import { ColorsController } from './controllers/color.controller';
import ColorsMiddleware from './middleware/color.middleware';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

// Misc
const router = express.Router();
const controller = new ColorsController();

/**
 * GET: Get all colors
 * POST: Add new color
 */
router
  .route(`/`)
  .get(controller.listColors)
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
    controller.createColor
  );

/**
 * PUT: Get all colors
 * GET: Add new color
 * DELETE: Add new color
 */

router.param(`colorId`, ColorsMiddleware.extractColorId);
router
  .route(`/:colorId`)
  .all(
    body('id')
      .toInt()
      .isInt({ gt: 0 })
      .withMessage(
        '/api/color/:colorId (id) must be a number greater than zero'
      ),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    ColorsMiddleware.validateColorExists
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
    controller.updateColorById
  )
  .get(controller.getColorById)
  .delete(controller.removeColorById);

export default router;
