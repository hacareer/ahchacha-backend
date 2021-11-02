import { Test, TestingModule } from '@nestjs/testing';
import { SecondDoseService } from './second-dose.service';

describe('SecondDoseService', () => {
  let service: SecondDoseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecondDoseService],
    }).compile();

    service = module.get<SecondDoseService>(SecondDoseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
