import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AutocompleteController } from './autocomplete.controller';
import { AutocompleteService } from './autocomplete.service';

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

  describe('findAll', () => {
    it('should return a list of countries when given a valid name', () => {
      const result = [{ name: 'Brazil', code: 'BR' }];
      jest.spyOn(service, 'findAll').mockReturnValue(result);

      expect(controller.findAll('BRA')).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith('BRA');
    });

    it('should return a 404 error when no countries are found', () => {
      jest.spyOn(service, 'findAll').mockReturnValue([]);

      expect(() => controller.findAll('invalid')).toThrowError(
        new HttpException('No results found', HttpStatus.NOT_FOUND),
      );
      expect(service.findAll).toHaveBeenCalledWith('invalid');
    });

    it('should return a list of all countries when no name is given', () => {
      const result = [
        { name: 'Brazil', code: 'BR' },
        { name: 'Canada', code: 'CA' },
      ];
      jest.spyOn(service, 'findAll').mockReturnValue(result);

      expect(controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(undefined);
    });

    it('should return a 500 error when an error occurs in the service', () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => {
        throw new Error('Internal server error');
      });

      expect(() => controller.findAll('invalid')).toThrowError(
        new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(service.findAll).toHaveBeenCalledWith('invalid');
    });
  });
});
