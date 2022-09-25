import express from 'express';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BrandsService } from '../../brand/services/brand.service';
import { VehiclesService } from '../services/vehicle.service';

const vehicleService = new VehiclesService();
const brandService = new BrandsService();

class VehiclesMiddleware {
  public async validateVehicleExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const vehicle = await vehicleService.readById(req.body.id);
      if (!vehicle) {
        throw new NotFoundError('Vehicle not found', 'validateVehicleExists');
      }
      res.locals.vehicle = vehicle;
      next();
    } catch (err) {
      next(err);
    }
  }

  public async verifyRelationshipWithBrand(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      if (req.body.brandId) {
        const vehicle = await brandService.readById(req.body.brandId);
        if (!vehicle) {
          throw new NotFoundError(
            'Brand not found',
            'verifyRelationshipWithBrand'
          );
        }
        //res.locals.brand = brand;
      }
      next();
    } catch (err) {
      next(err);
    }
  }

  // Utility for downstream middleware/controllers
  public async extractVehicleId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.vehicleId;
    next();
  }
}

export default new VehiclesMiddleware();
