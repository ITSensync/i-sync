// eslint-disable-next-line import/no-extraneous-dependencies
import { Sequelize } from 'sequelize';
import config from './sequelize.config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  },
);

export default sequelize;
