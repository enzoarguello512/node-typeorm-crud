import express from 'express';
import { NotFoundError } from '../../../common/error/not.found.error';
import { ColorsService } from '../services/color.service';

const service = new ColorsService();

class ColorsMiddleware {
  public async validateColorExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const color = await service.readById(req.body.id);
      if (!color) {
        throw new NotFoundError('Color not found', 'validateColorExists');
      }
      res.locals.color = color;
      next();
    } catch (err) {
      next(err);
    }
  }

  public async extractColorId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.colorId;
    next();
  }
}

export default new ColorsMiddleware();
