import { Test, TestingModule } from '@nestjs/testing';
import { ClinicCommentController } from './clinic-comment.controller';
import { ClinicCommentService } from './clinic-comment.service';

describe('ClinicCommentController', () => {
  let controller: ClinicCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicCommentController],
      providers: [ClinicCommentService],
    }).compile();

    controller = module.get<ClinicCommentController>(ClinicCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
