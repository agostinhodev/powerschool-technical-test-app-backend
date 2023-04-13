import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutocompleteModule } from './autocomplete/autocomplete.module';

@Module({
  imports: [AutocompleteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
