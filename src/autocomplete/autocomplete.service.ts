import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Autocomplete } from './entities/autocomplete.entity';

@Injectable()
export class AutocompleteService {
  findAll(): Autocomplete[] {
    const data = fs.readFileSync('src/autocomplete/data/countries.json');
    const countries: Autocomplete[] = JSON.parse(data.toString());

    return countries;
  }
}
