import { Test, TestingModule } from '@nestjs/testing';
import { SecondDoseController } from './second-dose.controller';
import { SecondDoseService } from './second-dose.service';

describe('SecondDoseController', () => {
  let controller: SecondDoseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecondDoseController],
      providers: [SecondDoseService],
    }).compile();

    controller = module.get<SecondDoseController>(SecondDoseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
