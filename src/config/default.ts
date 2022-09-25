import dotenv from 'dotenv';

// Enable environment variables
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  console.info(`Error: possibly the ".env" file is missing, the server can still run as long 
                as it has the environment variables.`);

  //console.error(dotenvResult.error);
}

// This file will be used by default when in development mode.
// The port will be changed to 8081.
const defaultConfig = {
  server: {
    port: process.env.PORT || 8081,
    domain: process.env.DOMAIN || '0.0.0.0',
  },
  databases: {
    postgres: {
      port: process.env.POSTGRES_PORT || 5432,
      host: '0.0.0.0',
      username: process.env.POSTGRES_USER || 'username',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'test',
    },
  },
};

export default defaultConfig;
