import { Test, TestingModule } from '@nestjs/testing';
import { UnivCommentService } from './univ-comment.service';

describe('UnivCommentService', () => {
  let service: UnivCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnivCommentService],
    }).compile();

    service = module.get<UnivCommentService>(UnivCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
