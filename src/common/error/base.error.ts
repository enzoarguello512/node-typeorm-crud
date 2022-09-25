import httpStatus from 'http-status';

// Customized class for errors (more detailed)
export default class BaseError extends Error {
  public readonly log: string;
  public readonly methodName: string | undefined;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    log: string,
    message: string | unknown = log,
    methodName?: string,
    httpCode = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(<string>message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.log = log;
    if (methodName) this.methodName = methodName;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

// Function that is used in middleware to maintain consistency in the error messages sent to the user.
export function errorStructure(
  httpCode: number,
  message?: string,
  isOperational?: boolean,
  err?: BaseError
): InstanceType<typeof BaseError> {
  const structure = {
    message: err?.message || message || 'Generic error',
    error: httpStatus[`${httpCode}_MESSAGE`],
    name: err?.name || 'Error',
    httpCode,
    log: err?.log || 'undefined',
    methodName: err?.methodName || 'undefined',
    isOperational: err?.isOperational || isOperational || false,
  };
  return structure;
}
