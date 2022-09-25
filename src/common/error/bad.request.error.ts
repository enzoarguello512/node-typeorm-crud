import httpStatus from 'http-status';
import BaseError from '../error/base.error';

export class BadRequestError extends BaseError {
  constructor(message = 'BAD_REQUEST', methodName = '') {
    super('', message, methodName, httpStatus.BAD_REQUEST, true);
  }
}
