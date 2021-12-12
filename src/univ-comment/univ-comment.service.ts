import {Injectable, BadRequestException} from '@nestjs/common';
import {CreateUnivCommentDto} from './dto/create-univ-comment.dto';
import {User} from 'src/user/entities/user.entity';
import {Univ} from 'src/univ/entities/univ.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UnivComment} from './entities/univ-comment.entity';
import {Err} from './../error';

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
    const existingUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['univ'],
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return await this.univCommentRepository.save({
      content: createUnivCommentDto.content,
      user: existingUser,
      univ: existingUser.univ,
    });
  }

  async findAllByUnivId(univId) {
    const existingUniv = await this.univRepository.findOne({
      where: {
        id: univId,
      },
    });
    if (!existingUniv) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return await this.univCommentRepository
      .createQueryBuilder('univComment')
      .leftJoinAndSelect('univComment.user', 'user')
      .where('univComment.univId = :univId', {univId})
      .select(['univComment.content', 'user.nickname'])
      .getMany();
  }
}
