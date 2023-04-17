import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AutocompleteController } from './autocomplete.controller';
import { AutocompleteService } from './autocomplete.service';
import { AutocompleteQueryParams } from './dto/autocomplete-quer-params.dto';

describe('AutocompleteController', () => {
  let controller: AutocompleteController;
  let service: AutocompleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutocompleteController],
      providers: [AutocompleteService],
    }).compile();

    controller = module.get<AutocompleteController>(AutocompleteController);
    service = module.get<AutocompleteService>(AutocompleteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // My tests
  describe('findAll', () => {
    it('should return a list of countries when given a valid name', async () => {
      const result = [{ name: 'Brazil', code: 'BR' }];
      jest.spyOn(service, 'findAll').mockReturnValue(result);

      const queryParams = new AutocompleteQueryParams();
      queryParams.name = 'BRA';
      const response = await controller.findAll(queryParams);

      expect(response).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith('BRA');
    });

    it('should return a 404 error when no countries are found', async () => {
      jest.spyOn(service, 'findAll').mockReturnValue([]);

      const queryParams = new AutocompleteQueryParams();
      queryParams.name = 'ZAZAZAZAZAZZA';

      await expect(controller.findAll(queryParams)).rejects.toThrow(
        HttpException,
      );
      await expect(controller.findAll(queryParams)).rejects.toThrowError(
        'No results found',
      );
      await expect(controller.findAll(queryParams)).rejects.toHaveProperty(
        'status',
        HttpStatus.NOT_FOUND,
      );

      expect(service.findAll).toHaveBeenCalledWith('ZAZAZAZAZAZZA');
    });

    it('should return a list of all countries when no name is given', async () => {
      const result = [
        { name: 'Brazil', code: 'BR' },
        { name: 'Canada', code: 'CA' },
      ];
      jest.spyOn(service, 'findAll').mockReturnValue(result);

      const queryParams = new AutocompleteQueryParams();
      await expect(controller.findAll(queryParams)).resolves.toEqual(result);

      expect(service.findAll).toHaveBeenCalledWith(undefined);
    });

    it('should return a 500 error when an error occurs in the service', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

      const queryParams = new AutocompleteQueryParams();
      queryParams.name = 'invalid';

      await expect(controller.findAll(queryParams)).rejects.toThrow(
        HttpException,
      );
      await expect(controller.findAll(queryParams)).rejects.toThrowError(
        new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(service.findAll).toHaveBeenCalledWith('invalid');
    });
  });
});
