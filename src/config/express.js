import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongooseConnector from './mongoose';
import redisConnector from './redis';
import routes from '../routes';
import { converter, notFound, handler } from '../utils/error';
import { logs } from './var';

const app = express();

app.use(bodyParser.json());

app.use(morgan(logs));

app.use('/', routes);

app.use(handler);

app.use(notFound);

app.use(converter);

mongooseConnector.connect();
redisConnector.connect();

module.exports = app;
