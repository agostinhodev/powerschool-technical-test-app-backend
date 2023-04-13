import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Autocomplete } from './entities/autocomplete.entity';

@Injectable()
export class AutocompleteService {
  findAll(query?: string): Autocomplete[] {
    const data = fs.readFileSync('src/autocomplete/data/countries.json');
    const countries: Autocomplete[] = JSON.parse(data.toString());

    if (query) {
      const filteredCountries = countries.filter((country) => {
        return country.name.toLowerCase().includes(query.toLowerCase());
      });

      return filteredCountries;
    }

    return countries;
  }
}
