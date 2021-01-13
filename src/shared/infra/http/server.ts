import 'reflect-metadata';
import 'dotenv';
import '@shared/infra/typeorm/';
import 'express-async-errors';
import '@shared/containers';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import { connection } from '@shared/infra/typeorm/';

const app = express();

connection.connect();
app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server up on port 3333');
});
