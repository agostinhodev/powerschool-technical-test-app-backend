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
    const countries = this.autocompleteService.findAll(name);
    if (countries.length === 0) {
      throw new HttpException('No results found', HttpStatus.NOT_FOUND);
    }
    return countries;
  }
}
