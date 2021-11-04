import { Test, TestingModule } from '@nestjs/testing';
import { ClinicCommentService } from './clinic-comment.service';

describe('ClinicCommentService', () => {
  let service: ClinicCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicCommentService],
    }).compile();

    service = module.get<ClinicCommentService>(ClinicCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
