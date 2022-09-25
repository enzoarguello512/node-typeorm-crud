import express from 'express';
import httpStatus from 'http-status';
import ErrorHandler from '../../../common/error.handler.config';
import BaseError, { errorStructure } from '../../../common/error/base.error';

class ErrorMiddleware {
  public async handle(
    err: BaseError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    if (!ErrorHandler.isTrustedError(err)) {
      next(err);
      return;
    }
    ErrorHandler.handleError(err);
    res
      .status(err.httpCode)
      .json(errorStructure(err.httpCode, err.message, undefined, err));
  }

  public async routeNotFound(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    const message = `Route '${req.originalUrl}' - Method '${req.method}' not found`;
    res
      .status(httpStatus.NOT_FOUND)
      .json(errorStructure(httpStatus.NOT_FOUND, message, true));
  }
}

export default new ErrorMiddleware();
