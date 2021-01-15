import { inject, injectable } from 'tsyringe';
import { clearObj } from '@shared/utils/utils';
import Sale from '../infra/typeorm/entities/Sale';
import ISaleRepository, { Filters } from '../repositories/ISaleRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class IndexSalesService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(filters?: Filters, order?: string): Promise<Sale[]> {
    clearObj(filters);

    let sales = await this.cacheProvider.recovery<Sale[]>(
      `sales-list-filtersBy:${JSON.stringify(filters)}:${JSON.stringify(
        order,
      )}`,
    );
    if (!sales) {
      sales = await this.saleRepository.index(filters, String(order));
      if (order === 'desc') {
        sales.sort((a, b) => b.price_with_discount - a.price_with_discount);
      } else if (order === 'asc') {
        sales.sort((a, b) => a.price_with_discount - b.price_with_discount);
      }
      await this.cacheProvider.save(
        `sales-list-filtersBy:${JSON.stringify(filters)}:${JSON.stringify(
          order,
        )}`,
        classToClass(sales),
      );
    }
    return sales;
  }
}

export default IndexSalesService;
