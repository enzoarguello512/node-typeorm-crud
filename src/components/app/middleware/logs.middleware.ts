import winston from 'winston';
import expressWinston from 'express-winston';

// Logger config
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
  // @ts-ignore
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}
export default expressWinston.logger(loggerOptions);
