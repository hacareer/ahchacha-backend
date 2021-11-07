import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {ClinicTag} from 'src/constants';
import {User} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {CreateClinicCommentDto} from './dto/create-clinic-comment.dto';
import {ClinicComment} from './entities/clinic-comment.entity';

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

  async create(user, createClinicCommentDto: CreateClinicCommentDto) {
    const existingUser = await this.userRepository.findOne({id: user.id});
    const existingClinic = await this.clinicRepository.findOne({
      id: createClinicCommentDto.clinicid,
    });
    const contentList = createClinicCommentDto.contents.split(',');
    const CommentList = await Promise.all(
      contentList.map(async (content) => {
        const commentyEntity = await this.clinicCommentRepository.save({
          content: content as ClinicTag,
          user: existingUser,
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
    const CommentList = await Promise.all(
      contents.map(async (content) => {
        const number = await this.clinicCommentRepository.count({
          where: {
            content: content as ClinicTag,
            clinic: existingClinic,
          },
        });
        return {content, number};
      }),
    );
    return CommentList;
  }
}
