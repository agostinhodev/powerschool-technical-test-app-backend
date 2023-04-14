import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AutoComplete (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  //My tests

  it('should return an empty array for an invalid search string', () => {
    return request(app.getHttpServer())
      .get('/autocomplete?name=invalid')
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'No results found',
      });
  });

  it('should return all countries for an empty search string', () => {
    const expectedCountries = [
      'Brazil',
      'Canada',
      'Denmark',
      'Ecuador',
      'France',
    ];

    return request(app.getHttpServer())
      .get('/autocomplete')
      .expect(200)
      .expect((res) => {
        const countryNames = res.body.map((country) => country.name);
        expect(countryNames).toEqual(expect.arrayContaining(expectedCountries));
      });
  });

  it('should return matching countries for a valid search string', () => {
    const expectedResponse = [
      { name: 'Brazil', code: 'BR' },
      { name: 'Gibraltar', code: 'GI' },
    ];

    return request(app.getHttpServer())
      .get('/autocomplete?name=bra')
      .expect(200)
      .expect(expectedResponse);
  });

  it("shouldn't return Ecuador when I'm looking for Brazil", () => {
    const unexpectedResponse = [{ name: 'Ecuador', code: 'EC' }];

    return request(app.getHttpServer())
      .get('/autocomplete?name=BRa')
      .expect(200)
      .expect((res) => {
        const matched = unexpectedResponse.some((item) =>
          res.body.find(
            (country) =>
              country.name === item.name && country.code === item.code,
          ),
        );
        if (matched) {
          throw new Error(
            "Unexpected response contains a country that shouldn't be present.",
          );
        }
      });
  });

  it('should return multiple countries', () => {
    return request(app.getHttpServer())
      .get('/autocomplete?name=D')
      .expect(200)
      .expect((res) => {
        if (res.body.length <= 10) {
          throw new Error(
            `Expected the response to contain more than 10 countries that start with the letter 'd', but received ${res.body.length} countries.`,
          );
        }
      });
  });

  it('should return an error message array if the search string is too long', () => {
    return request(app.getHttpServer())
      .get('/autocomplete?name=BrazilBrazilBrazilBrazilBrazilBrazilBrazilBra')
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'The country name provided is too long. Please enter a name with fewer than 44 characters.',
        ],
        error: 'Bad Request',
      });
  });

  it('should return an empty array if the search string contains invalid characters', () => {
    return request(app.getHttpServer())
      .get('/autocomplete?name=*')
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'The country name provided contains special characters. Please enter a name with only alphanumeric characters.',
        ],
        error: 'Bad Request',
      });
  });
});
