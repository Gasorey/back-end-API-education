import ICacheProvider from '../models/ICacheProvider';
import Redis, { Redis as RadisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import Sale from '@modules/sale/infra/typeorm/entities/Sale';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RadisClient;
  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }
  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recovery<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
}
