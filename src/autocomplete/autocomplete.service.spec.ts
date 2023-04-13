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

  it('should return an array of countries', () => {
    const countries = service.findAll();
    expect(countries).toBeDefined();
    expect(countries.length).toBeGreaterThan(0);
  });

  it('should return filtered countries when a search term is provided', () => {
    const countries = service.findAll('BRA');
    expect(countries).toBeDefined();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0].name).toEqual('Brazil');
  });
});
