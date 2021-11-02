import { Test, TestingModule } from '@nestjs/testing';
import { UnivController } from './univ.controller';
import { UnivService } from './univ.service';

describe('UnivController', () => {
  let controller: UnivController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnivController],
      providers: [UnivService],
    }).compile();

    controller = module.get<UnivController>(UnivController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
