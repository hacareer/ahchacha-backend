import {Injectable, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {ClinicCommentTag} from 'src/constants';
import {User} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {CreateClinicCommentDto} from './dto/create-clinic-comment.dto';
import {ClinicComment} from './entities/clinic-comment.entity';
import {Err} from '../common/error';

@Injectable()
export class ClinicCommentService {
  constructor(
    @InjectRepository(ClinicComment)
    private readonly clinicCommentRepository: Repository<ClinicComment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async createClinicComment(
    userId,
    createClinicCommentDto: CreateClinicCommentDto,
  ) {
    const user = await this.userRepository.findOne({id: userId});
    const existingClinic = await this.clinicRepository.findOne({
      id: createClinicCommentDto.clinicid,
    });
    if (!existingClinic) {
      throw new BadRequestException(Err.CLINIC.NOT_FOUND);
    }
    const contentList = createClinicCommentDto.contents.split(',');
    const CommentList = await Promise.all(
      contentList.map(async (content) => {
        // TODO content 에러핸들링

        const commentyEntity = await this.clinicCommentRepository.save({
          content: content as ClinicCommentTag,
          user,
          clinic: existingClinic,
        });
        return commentyEntity;
      }),
    );
    return CommentList;
  }

  async countContents(clinicId: number) {
    const contents = ['T1', 'T2', 'T3', 'T4', 'T5'];
    const existingClinic = await this.clinicRepository.findOne({
      id: clinicId,
    });
    if (!existingClinic) {
      throw new BadRequestException(Err.CLINIC.NOT_FOUND);
    }
    const CommentList = await Promise.all(
      contents.map(async (content) => {
        const number = await this.clinicCommentRepository.count({
          where: {
            content: content as ClinicCommentTag,
            clinic: existingClinic,
          },
        });
        return {content, number};
      }),
    );
    return CommentList;
  }
}
