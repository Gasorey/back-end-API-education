import { createConnection } from 'typeorm';

try {
  createConnection();
  console.log('Connected');
} catch (err) {
  console.log(err, 'Failed Connection');
}
