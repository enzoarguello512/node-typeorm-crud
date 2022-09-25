import express from 'express';
import { BadRequestError } from '../../../common/error/bad.request.error';
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

  async validateSameColorDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // We validate if the property exists in the body in case it is a PUT request
      if (req.body.name) {
        const color = await service.readByName(req.body.name);
        if (color) {
          throw new BadRequestError(
            'Color name already exists',
            'validateSameColorDoesntExist'
          );
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  }

  // Utility for downstream middleware/controllers
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
