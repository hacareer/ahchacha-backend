import { Test, TestingModule } from '@nestjs/testing';
import { CheckUpService } from './check-up.service';

describe('CheckUpService', () => {
  let service: CheckUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckUpService],
    }).compile();

    service = module.get<CheckUpService>(CheckUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
