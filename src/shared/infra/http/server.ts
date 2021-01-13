import 'reflect-metadata';
import 'dotenv';
import '@shared/infra/typeorm/';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.listen(3333, () => {
  console.log('Server up on port 3333');
});
