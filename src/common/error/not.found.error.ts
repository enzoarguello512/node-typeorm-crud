import httpStatus from 'http-status';
import BaseError from '../error/base.error';

export class NotFoundError extends BaseError {
  constructor(message = 'NOT_FOUND', methodName = '') {
    super('', message, methodName, httpStatus.NOT_FOUND, true);
  }
}
