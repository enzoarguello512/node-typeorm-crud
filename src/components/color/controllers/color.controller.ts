import express from 'express';
import debug from 'debug';
import httpStatus from 'http-status';
import { ColorsService } from '../services/color.service';
import { Color } from '../entity/color.entity';

const log: debug.IDebugger = debug('app:colors-controller');
const service = new ColorsService();

export class ColorsController {
  public async createColor(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const color = await service.create({
        name: req.body.name,
        vehiclesId: req.body.vehiclesId,
      });
      res.status(httpStatus.CREATED).send(color);
    } catch (err) {
      next(err);
    }
  }

  public async listColors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const colors = await service.list(25, 0);
      res.status(httpStatus.OK).send(colors);
    } catch (err) {
      next(err);
    }
  }

  public async getColorById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const colorId: string = req.body.id;
      const fetchedColor: Color = res.locals.color;
      const color = await service.readById(colorId, fetchedColor);
      res.status(httpStatus.OK).send(color);
    } catch (err) {
      next(err);
    }
  }

  public async updateColorById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const colorFields = {
        name: req.body.name,
        vehiclesId: req.body.vehiclesId,
      };
      const fetchedColor: Color = res.locals.color;
      log(await service.updateById(colorFields, fetchedColor));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  public async removeColorById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const fetchedColor: Color = res.locals.color;
      log(await service.deleteById(fetchedColor));
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
}
