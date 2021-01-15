import { getRandomNumber } from '@shared/utils/utils';
import * as Faker from 'faker/locale/pt_BR';

// Faker.setLocale('pt_BR');

const fakeUniversities = [...Array(100)].map(university => ({
  name: Faker.company.companyName(),
  score: Faker.random.float({
    max: 10,
    min: 0,
  }),
  logo_url: Faker.image.imageUrl(),
}));

const fakeCampus = [...Array(100)].map(campus => ({
  name: Faker.address.state(),
  city: Faker.address.streetName(),
  university_id: getRandomNumber(1, 100).toFixed(0),
}));

const fakeCourse = [...Array(100)].map(course => ({
  name: Faker.name.jobArea(),
  kind: Faker.random.arrayElement(['Presencial', 'EaD', 'Hibrido']),
  level: Faker.random.arrayElement([
    'Tecnólogo',
    'Bacharelado',
    'Licenciatura',
  ]),
  shift: Faker.random.arrayElement(['Virtual', 'Manhã', 'Noite', 'Integral']),
  university_id: getRandomNumber(1, 100).toFixed(0),
  campus_id: getRandomNumber(1, 100).toFixed(0),
}));

const fakeSales = [...Array(100)].map(sale => {
  const full_price = Faker.random.number({
    min: 800,
    max: 5000,
    precision: 2,
  });
  const year = getRandomNumber(2021, 2023).toFixed(0);
  const semester = Faker.random.arrayElement(['1', '2']);
  const discount = getRandomNumber(0.1, 99.9);
  const month =
    semester > '1'
      ? Faker.random.number({ min: 7, max: 12 })
      : Faker.random.number({ min: 1, max: 6 });
  const newSale = {
    full_price: full_price,
    price_with_discount: Number((full_price * (1 - discount / 100)).toFixed(2)),
    discount_percentage: discount,
    start_date: `${Faker.random.number({
      min: 1,
      max: 30,
    })}/${month}/${year}`,
    enrollment_semester: `${year}.${semester}`,
    enabled: Faker.random.boolean(),
    university_id: getRandomNumber(1, 100).toFixed(0),
    campus_id: getRandomNumber(1, 100).toFixed(0),
    course_id: getRandomNumber(1, 100).toFixed(0),
  };
  return newSale;
});

export { fakeCampus, fakeCourse, fakeSales, fakeUniversities };
