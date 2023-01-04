import ApiServer from '@tabdigital/api-server';
import { verifyAccount, authToken } from './middlewares';
import config from './config';
import pkg from '../package.json';
import routes from './routes';

const createServer = () => {
  const cfg = config.get();

  const server = new ApiServer({
    basePath: cfg.basePath,
    defaultCacheAge: 0,
    port: cfg.serverPort,
    publicUrl: cfg.publicUrl,
    enableDiscovery: true,
    showStackTrace: cfg.showStackTrace
  });

  server.after((restifyServer) => {
    // TODO: 1 - save-bet - Add route to auth
    restifyServer.use(authToken.handler);
    restifyServer.use(verifyAccount.handler);
  });

  server.route(routes);

  server.status((version = '101') => {
    return { statusCode: 200, response: `The version is ${version}.` };
  });
  server.statusDetails(
    (version = '101', hostname = 'venue-connect') => {
      return {
        statusCode: 200,
        response: `The version is ${version} and host name is ${hostname}.`
      };
    }
  );

  return server;
};

export default createServer;
