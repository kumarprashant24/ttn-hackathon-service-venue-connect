import dbSetup from '@tabdigital/db-setup';

const migrate = async (activity, config, logger) => {
  const log = logger ? logger.info.bind(logger) : console.log.bind(console);
  await dbSetup.migration[activity](config.venueConnectDatabase, {});
  log(`Db migrations ${activity} successfully!`);
};

export default migrate;
