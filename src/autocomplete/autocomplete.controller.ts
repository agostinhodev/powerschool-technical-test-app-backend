import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AutocompleteService } from './autocomplete.service';
import { AutocompleteQueryParams } from './dto/autocomplete-quer-params.dto';

@Controller('autocomplete')
export class AutocompleteController {
  constructor(private readonly autocompleteService: AutocompleteService) {}

  @Get()
  async findAll(@Query() queryParams: AutocompleteQueryParams) {
    const countries = this.autocompleteService.findAll(queryParams.name);
    if (countries.length === 0)
      throw new HttpException('No results found', HttpStatus.NOT_FOUND);

    return countries;
  }
}
