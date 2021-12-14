import {Injectable, BadRequestException} from '@nestjs/common';
import {CreateUnivCommentDto} from './dto/create-univ-comment.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UnivComment} from './entities/univ-comment.entity';
import {Err} from './../error';
import {Univ} from './../univ/entities/univ.entity';
import {User} from './../user/entities/user.entity';

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
  async create(userId: number, createUnivCommentDto: CreateUnivCommentDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['univ'],
    });
    return await this.univCommentRepository.save({
      content: createUnivCommentDto.content,
      user,
      univ: user.univ,
    });
  }

  async findAllByUnivId(univId) {
    const existingUniv = await this.univRepository.findOne({
      where: {
        id: univId,
      },
    });
    if (!existingUniv) {
      throw new BadRequestException(Err.UNIV.NOT_FOUND);
    }
    return await this.univCommentRepository
      .createQueryBuilder('univComment')
      .leftJoinAndSelect('univComment.user', 'user')
      .where('univComment.univId = :univId', {univId})
      .select(['univComment.content', 'user.nickname'])
      .getMany();
  }
}
