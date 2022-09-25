import debug from 'debug';
import BaseError from './error/base.error';

const log: debug.IDebugger = debug('error-handler');

class ErrorHandler {
  // Log the error via console
  public handleError(err: Error): void {
    log(err);
  }

  // Basically checks if it is an error raised by us.
  public isTrustedError(error: Error): boolean {
    return error instanceof BaseError && error.isOperational;
  }
}

export default new ErrorHandler();
