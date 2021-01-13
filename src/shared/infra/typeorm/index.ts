import { createConnection, getConnection } from 'typeorm';
export const connection = {
  async connect() {
    await createConnection();
    console.log('Connected');
  },
  async close() {
    await getConnection().close();
  },
};
