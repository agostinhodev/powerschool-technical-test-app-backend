import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AutocompleteService } from './autocomplete.service';

@Controller('autocomplete')
export class AutocompleteController {
  constructor(private readonly autocompleteService: AutocompleteService) {}

  @Get()
  findAll(@Query('name') name?: string) {
    if (name && name.length > 44)
      throw new HttpException(
        'The country name provided is too long. Please enter a name with fewer than 44 characters.',
        HttpStatus.BAD_REQUEST,
      );

    const countries = this.autocompleteService.findAll(name);
    if (countries.length === 0)
      throw new HttpException('No results found', HttpStatus.NOT_FOUND);

    return countries;
  }
}
