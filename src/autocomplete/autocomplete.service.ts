import { Injectable } from '@nestjs/common';
import countries from './autocomplete.data';
import { Autocomplete } from './entities/autocomplete.entity';

@Injectable()
export class AutocompleteService {
  findAll(name?: string): Autocomplete[] {
    if (name) {
      const filteredCountries = countries.filter((country) => {
        return country.name.toLowerCase().includes(name.toLowerCase());
      });

      return filteredCountries;
    }

    return countries;
  }
}
