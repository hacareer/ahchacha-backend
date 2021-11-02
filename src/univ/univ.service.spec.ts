import { Test, TestingModule } from '@nestjs/testing';
import { UnivService } from './univ.service';

describe('UnivService', () => {
  let service: UnivService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnivService],
    }).compile();

    service = module.get<UnivService>(UnivService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
