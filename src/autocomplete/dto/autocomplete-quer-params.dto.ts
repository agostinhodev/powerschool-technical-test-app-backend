import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class AutocompleteQueryParams {
  @IsOptional()
  @IsString()
  @MaxLength(44, {
    message:
      'The country name provided is too long. Please enter a name with fewer than 44 characters.',
  })
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message:
      'The country name provided contains special characters. Please enter a name with only alphanumeric characters.',
  })
  name?: string;
}
