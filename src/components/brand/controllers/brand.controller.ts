import express from 'express';
import debug from 'debug';
import httpStatus from 'http-status';
import { BrandsService } from '../services/brand.service';
import { Brand } from '../entity/brand.entity';

const log: debug.IDebugger = debug('app:brands-controller');
const service = new BrandsService();

export class BrandsController {
  public async createBrand(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const brand = await service.create({
        name: req.body.name,
        vehiclesId: req.body.vehiclesId,
      });
      res.status(httpStatus.CREATED).send(brand);
    } catch (err) {
      next(err);
    }
  }

  public async listBrands(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const brands = await service.list(25, 0);
      res.status(httpStatus.OK).send(brands);
    } catch (err) {
      next(err);
    }
  }

  public async getBrandById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const brandId: string = req.body.id;
      const fetchedBrand: Brand = res.locals.brand;
      const brand = await service.readById(brandId, fetchedBrand);
      res.status(httpStatus.OK).send(brand);
    } catch (err) {
      next(err);
    }
  }

  public async updateBrandById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const brandFields = {
        name: req.body.name,
        vehiclesId: req.body.vehiclesId,
      };
      const fetchedBrand: Brand = res.locals.brand;
      log(await service.updateById(brandFields, fetchedBrand));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeBrandById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const fetchedBrand: Brand = res.locals.brand;
      log(await service.deleteById(fetchedBrand));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}
