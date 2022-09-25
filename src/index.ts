import { AppDataSource } from './data-source';
import app from './app';
import config from 'config';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('server');
const port = config.get<number>('server.port');
const domain = config.get<string>('server.domain');
const startMessage: string = `Server running at http://${domain}:${port}`;

(async function () {
  try {
    await AppDataSource.initialize();
    app.listen(port, () => {
      debugLog(startMessage);
      console.log(startMessage);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
