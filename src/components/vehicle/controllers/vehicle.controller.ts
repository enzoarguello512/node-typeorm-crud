import express from 'express';
import debug from 'debug';
import httpStatus from 'http-status';
import { VehiclesService } from '../services/vehicle.service';
import { Vehicle } from '../entity/vehicle.entity';

const log: debug.IDebugger = debug('app:vehicles-controller');
const service = new VehiclesService();

export class VehiclesController {
  public async createVehicle(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const vehicle = await service.create({
        name: req.body.name,
        year: req.body.year,
        brandId: req.body.brandId,
        model: req.body.model,
        colorsId: req.body.colorsId,
      });
      res.status(httpStatus.CREATED).send(vehicle);
    } catch (err) {
      next(err);
    }
  }

  public async listVehicles(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const vehicles = await service.list(25, 0);
      res.status(httpStatus.OK).send(vehicles);
    } catch (err) {
      next(err);
    }
  }

  public async getVehicleById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const vehicleId: string = req.body.id;
      const fetchedVehicle: Vehicle = res.locals.vehicle;
      const vehicle = await service.readById(vehicleId, fetchedVehicle);
      res.status(httpStatus.OK).send(vehicle);
    } catch (err) {
      next(err);
    }
  }

  public async updateVehicleById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const vehicleFields = {
        name: req.body.name,
        year: req.body.year,
        brandId: req.body.brandId,
        model: req.body.model,
        colorsId: req.body.colorsId,
      };
      const fetchedVehicle: Vehicle = res.locals.vehicle;
      log(await service.updateById(vehicleFields, fetchedVehicle));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeVehicleById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const fetchedVehicle: Vehicle = res.locals.vehicle;
      log(await service.deleteById(fetchedVehicle));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}
