import { Test, TestingModule } from '@nestjs/testing';
import { AutocompleteService } from './autocomplete.service';

describe('AutocompleteService', () => {
  let service: AutocompleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutocompleteService],
    }).compile();

    service = module.get<AutocompleteService>(AutocompleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //My tests
  it('should return an array of countries', () => {
    const countries = service.findAll();
    expect(countries).toBeDefined();
    expect(countries.length).toBeGreaterThan(0);
  });

  it('should return all the countries in the world', () => {
    const countries = service.findAll();
    expect(countries).toBeDefined();
    expect(countries.length).toStrictEqual(243); //Total countries in the world
  });

  it('should return Brazil', () => {
    const countries = service.findAll('BRA');
    expect(countries).toBeDefined();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0].name).toEqual('Brazil');
  });

  it('should return United States', () => {
    const countries = service.findAll('United Sta');
    expect(countries).toBeDefined();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0].name).toEqual('United States');
  });

  it('should return the two Koreas', () => {
    const countries = service.findAll('korea');
    expect(countries).toBeDefined();
    expect(countries.length).toStrictEqual(2);
    expect(countries[0].name).toEqual("Korea, Democratic People'S Republic of");
    expect(countries[1].name).toEqual('Korea, Republic of');
  });

  it('should return an empty array when search for Zorgonikovia', () => {
    const countries = service.findAll('Zorgonikovia');
    expect(countries).toBeDefined();
    expect(countries.length).toEqual(0);
  });
});
