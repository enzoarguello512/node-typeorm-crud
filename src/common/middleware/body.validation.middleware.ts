import express from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../error/bad.request.error';

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = Object.values(errors.array()).map((prop) => prop.msg);
      return next(
        new BadRequestError(message.join('. '), 'BodyValidationMiddleware')
      );
    }
    next();
  }
}

export default new BodyValidationMiddleware();
