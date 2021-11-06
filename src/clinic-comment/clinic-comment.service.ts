import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {User} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {CreateClinicCommentDto} from './dto/create-clinic-comment.dto';
import {UpdateClinicCommentDto} from './dto/update-clinic-comment.dto';
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
    // const existingUser = await this.userRepository.findOne({id: user.id});
    // const existingClinic = await this.clinicRepository.findOne({
    //   id: createClinicCommentDto.clinicid,
    // });
    console.log(createClinicCommentDto);
    const contentList = createClinicCommentDto.contentList;
    console.log(contentList);
    const unicCommentyList = await Promise.all(
      contentList.map(async (content) => {
        // const unicCommentyEntity = await this.clinicCommentRepository.save({
        //   content,
        //   user: existingUser,
        //   clinic: existingClinic,
        // });
        // return unicCommentyEntity;
        console.log(content);
      }),
    );
    return unicCommentyList;
  }

  //TODO 개수
  async countContents(id: number) {
    return `This action returns a #${id} clinicComment`;
  }
}
