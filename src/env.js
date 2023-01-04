const env = process.env.APP_ENV || 'Dev';
export default env;

process.env.CONFIG_PATH = `configs/${env}/config.json`;
