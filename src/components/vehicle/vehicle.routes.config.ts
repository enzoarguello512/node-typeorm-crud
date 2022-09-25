import express from 'express';
import { VehiclesController } from './controllers/vehicle.controller';
import VehiclesMiddleware from './middleware/vehicle.middleware';
import BodyValidationMiddleware from '../../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

// Misc
const router = express.Router();
const controller = new VehiclesController();

/**
 * GET: Get all vehicles
 * POST: Add a new vehicle
 */
router
  .route(`/`)
  .get(controller.listVehicles)
  .post(
    body('name')
      .isString()
      .withMessage('Required field "name" of type "string"'),
    body('model')
      .isString()
      .withMessage('Required field "model" of type "string"'),
    body('year')
      .isInt()
      .withMessage('Year has to be of type number')
      .optional(),
    body('brandId')
      .isInt()
      .withMessage('BrandId has to be a number')
      .optional(),
    body('colorsId')
      .isArray()
      .withMessage('ColorsId has to be an array of numbers (ids)')
      .isNumeric()
      .withMessage('ColorsId only has to contain numbers (ids)')
      .optional(),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    controller.createVehicle
  );

/**
 * PUT: Update a vehicle
 * GET: Find an individual vehicle
 * DELETE: Delete a vehicle
 */
router.param(`vehicleId`, VehiclesMiddleware.extractVehicleId);
router
  .route(`/:vehicleId`)
  .all(
    body('id')
      .toInt()
      .isInt({ gt: 0 })
      .withMessage(
        '/api/vehicle/:vehicleId (id) must be a number greater than zero'
      ),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    VehiclesMiddleware.validateVehicleExists
  )
  .put(
    body('name').isString().withMessage('Name has to be a string').optional(),
    body('year')
      .isInt()
      .withMessage('Year has to be of type number')
      .optional(),
    body('brandId')
      .isInt()
      .withMessage('BrandId has to be a number')
      .optional(),
    body('model').isString().withMessage('Model has to be a string').optional(),
    body('colorsId')
      .isArray()
      .withMessage('ColorsId has to be an array of numbers (ids)')
      .isNumeric()
      .withMessage('ColorsId only has to contain numbers (ids)')
      .optional(),
    BodyValidationMiddleware.verifyBodyFieldsErrors,
    controller.updateVehicleById
  )
  .get(controller.getVehicleById)
  .delete(controller.removeVehicleById);

export default router;
