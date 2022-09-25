import express from 'express';
import { NotFoundError } from '../../../common/error/not.found.error';
import { BrandsService } from '../services/brand.service';

const service = new BrandsService();

class BrandsMiddleware {
  public async validateBrandExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const brand = await service.readById(req.body.id);
      if (!brand) {
        throw new NotFoundError('Brand not found', 'validateBrandExists');
      }
      res.locals.brand = brand;
      next();
    } catch (err) {
      next(err);
    }
  }

  public async extractBrandId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.brandId;
    next();
  }
}

export default new BrandsMiddleware();
