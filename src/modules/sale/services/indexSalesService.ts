import { inject, injectable } from 'tsyringe';
import { clearObj } from '@shared/utils/utils';
import Sale from '../infra/typeorm/entities/Sale';
import ISaleRepository, { Filters } from '../repositories/ISaleRepository';

@injectable()
class IndexSalesService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  public async execute(filters?: Filters, order?: string): Promise<Sale[]> {
    console.log(
      `Sale Service Index START | Filters: ${JSON.stringify(
        filters,
        null,
        2,
      )} Order: ${JSON.stringify(order, null, 2)}`,
    );
    if (filters) {
      clearObj(filters);

      const sales = await this.saleRepository.index(filters, order);
      if (order === 'ASC') {
        sales.sort((a, b) => b.price_with_discount - a.price_with_discount);
      } else if (order === 'DESC') {
        sales.sort((a, b) => a.price_with_discount - b.price_with_discount);
      }

      return sales;
    }
    const sales = await this.saleRepository.index();

    if (order === 'ASC') {
      sales.sort((a, b) => b.price_with_discount - a.price_with_discount);
    }
    sales.sort((a, b) => a.price_with_discount - b.price_with_discount);
    return sales;
  }
}

export default IndexSalesService;
