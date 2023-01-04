import server from './server';
import pkg from '../package.json';
// import dbConnect from './database/dbConnect';
 
const start = async () => {
  try {
    // dbConnect();
    const app = server();
    await app.start();
    console.log(`${pkg.name} listening at ${app.opts.port}`);
  } catch (e) {
    console.error(e, 'Error starting server');
    process.exit(1);
  }
};

export default start;
