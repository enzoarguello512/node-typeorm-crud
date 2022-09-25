import express from 'express';
import { NotFoundError } from '../../../common/error/not.found.error';
import { VehiclesService } from '../services/vehicle.service';

const service = new VehiclesService();

class VehiclesMiddleware {
  public async validateVehicleExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const vehicle = await service.readById(req.body.id);
      if (!vehicle) {
        throw new NotFoundError('Vehicle not found', 'validateVehicleExists');
      }
      res.locals.vehicle = vehicle;
      next();
    } catch (err) {
      next(err);
    }
  }

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
