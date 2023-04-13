import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Autocomplete } from './entities/autocomplete.entity';

@Injectable()
export class AutocompleteService {
  findAll(name?: string): Autocomplete[] {
    const data = fs.readFileSync('src/autocomplete/data/countries.json');
    const countries: Autocomplete[] = JSON.parse(data.toString());

    if (name) {
      const filteredCountries = countries.filter((country) => {
        return country.name.toLowerCase().includes(name.toLowerCase());
      });

      return filteredCountries;
    }

    return countries;
  }
}
