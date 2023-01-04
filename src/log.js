import APILogger from '@tabdigital/api-logger';

import pkg from '../package.json';

export default new APILogger({
  level: 'debug',
  name: pkg.name
});
