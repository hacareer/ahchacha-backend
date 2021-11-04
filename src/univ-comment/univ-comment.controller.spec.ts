import { Test, TestingModule } from '@nestjs/testing';
import { UnivCommentController } from './univ-comment.controller';
import { UnivCommentService } from './univ-comment.service';

describe('UnivCommentController', () => {
  let controller: UnivCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnivCommentController],
      providers: [UnivCommentService],
    }).compile();

    controller = module.get<UnivCommentController>(UnivCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
