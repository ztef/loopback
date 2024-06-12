import https from 'https';
import fs from 'fs';

import 'dotenv/config';

import {ApplicationConfig, GettingStartedApplication} from './application';

export * from './application';

const isProduction = process.env.NODE_ENV === 'production';

export async function main(options: ApplicationConfig = {}) {
  const app = new GettingStartedApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  if (isProduction) {
    console.log("MODE : PRODUCTION");
  } else {
    console.log("MODE : Developement");
  }

  return app;
}

if (require.main === module) {



  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },

      ...(isProduction && {
        protocol: 'https',
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem'),
      }),

    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
