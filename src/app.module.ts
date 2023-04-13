import { Module } from '@nestjs/common';
import { AutocompleteModule } from './autocomplete/autocomplete.module';

@Module({
  imports: [AutocompleteModule],
})
export class AppModule {}
