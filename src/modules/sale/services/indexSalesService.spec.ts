import { connection } from '@shared/infra/typeorm/index';
import SalesRepository from '../infra/typeorm/repositories/SaleRepository';
import IndexSalesService from './indexSalesService';

let salesRepository: SalesRepository;
let indexSalesService: IndexSalesService;

describe('Index Sales', () => {
  beforeAll(async () => {
    await connection.connect();
  });
  beforeEach(async () => {
    salesRepository = new SalesRepository();
    indexSalesService = new IndexSalesService(salesRepository);
  });
  it('Should be able to filter university_name', async () => {
    const sales = await indexSalesService.execute();
    const { name } = sales[0].university;
    const university_name = name;
    const expectedQuantity = sales.filter(sale => sale.university.name === name)
      .length;
    const ReceivedQuantity = await (
      await indexSalesService.execute({ university_name })
    ).length;
    expect(expectedQuantity).toEqual(ReceivedQuantity);
  });
  it('Should be able to sort by price_with_discount with filters DESC', async () => {
    const sales = await indexSalesService.execute();
    const { kind } = sales[0].course;
    const course_kind = kind;
    const order = 'DESC';
    const filteredSales = await indexSalesService.execute(
      { course_kind },
      order,
    );
    console.log(filteredSales[0], 'filteredSales[0]');
    expect(filteredSales[0].price_with_discount).toBeLessThanOrEqual(
      filteredSales[filteredSales.length - 1].price_with_discount,
    );
  });
  it('Should be able to sort by price_with_discount with filters ASC', async () => {
    const sales = await indexSalesService.execute();
    const { kind } = sales[0].course;
    const course_kind = kind;
    const order = 'ASC';
    const filteredSales = await indexSalesService.execute(
      { course_kind },
      order,
    );
    console.log(filteredSales[0], 'filteredSales[0]');
    expect(
      filteredSales[filteredSales.length - 1].price_with_discount,
    ).toBeLessThanOrEqual(filteredSales[0].price_with_discount);
  });
  it('Should be able to sort by price_with_discount without filters DESC', async () => {
    const order = 'DESC';
    const filters = {};
    const sales = await indexSalesService.execute(undefined, order);

    expect(sales[0].price_with_discount).toBeLessThanOrEqual(
      sales[sales.length - 1].price_with_discount,
    );
  });
  it('Should be able to sort by price_with_discount without filters ASC', async () => {
    const order = 'ASC';
    const filters = {};
    const sales = await indexSalesService.execute(undefined, order);

    expect(sales[0].price_with_discount).toBeLessThanOrEqual(
      sales[sales.length - 1].price_with_discount,
    );
  });
});
