import { Test, TestingModule } from '@nestjs/testing';
import { CheckUpController } from './check-up.controller';
import { CheckUpService } from './check-up.service';

describe('CheckUpController', () => {
  let controller: CheckUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckUpController],
      providers: [CheckUpService],
    }).compile();

    controller = module.get<CheckUpController>(CheckUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
