import Sale from '@modules/sale/infra/typeorm/entities/Sale';

export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recovery<T>(key: string): Promise<T | null>;
}
