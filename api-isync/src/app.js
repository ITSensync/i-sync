import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import middlewares from './middlewares.js';
import api from './api/index.js';
import sequelize from './config/db.config.js';
import { Box } from './models/box.js';
import { Stuff } from './models/stuff.js';
dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({ extended: true })
);

(async () => {
  try {
    await sequelize.authenticate();
    Box.sync({ alter: true })
    Stuff.sync({ alter: true })
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
