import {Injectable} from '@nestjs/common';
import {CreateUnivCommentDto} from './dto/create-univ-comment.dto';
import {User} from 'src/user/entities/user.entity';
import {Univ} from 'src/univ/entities/univ.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UnivComment} from './entities/univ-comment.entity';

@Injectable()
export class UnivCommentService {
  constructor(
    @InjectRepository(Univ)
    private readonly univRepository: Repository<Univ>,
    @InjectRepository(UnivComment)
    private readonly univCommentRepository: Repository<UnivComment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(user: User, createUnivCommentDto: CreateUnivCommentDto) {
    const univ = await this.univRepository.findOne(createUnivCommentDto.univId);
    const existingUser = await this.userRepository.findOne(user.id);
    return await this.univCommentRepository.save({
      content: createUnivCommentDto.content,
      user: existingUser,
      univ,
    });
  }

  async findByUnivId(univId) {
    return await this.univCommentRepository
      .createQueryBuilder('univComment')
      .leftJoinAndSelect('univComment.user', 'user')
      .where('univComment.univId = :univId', {univId})
      .select(['univComment.content', 'user.nickname'])
      .getMany();
  }
}
