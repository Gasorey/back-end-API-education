import IndexSalesService from '@modules/sale/services/indexSalesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SalesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexSales = container.resolve(IndexSalesService);

    const university_name = request.query.university_name as string;
    const course_kind = request.query.course_kind as string;
    const course_level = request.query.course_level as string;
    const course_name = request.query.course_name as string;
    const campus_city = request.query.campus_city as string;
    const course_shift = request.query.course_shift as string;
    const order = request.query.order as string;

    const filters = {
      university_name,
      course_kind,
      course_level,
      course_name,
      campus_city,
      course_shift,
    };

    const getSale = await indexSales.execute(filters, order);
    return response.json(classToClass(getSale)).status(200);
  }
}
