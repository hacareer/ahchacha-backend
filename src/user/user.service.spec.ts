import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Univ} from './../univ/entities/univ.entity';

class MockUserRepository {
  #data = [
    {
      id: 1,
      nickname: 'test',
      kakaoAccount: 'test',
      vaccination: 'NO',
      deviceId: 'test',
      locationId: 1,
    },
  ];
  async findOne({where: {kakaoAccount: kakaoId}}): Promise<{
    id: number;
    nickname: string;
    kakaoAccount: string;
    vaccination: string;
    deviceId: string;
    locationId: number;
  }> {
    const data = this.#data.find((v) => v.kakaoAccount === kakaoId);
    if (data) {
      return data;
    }
    return null;
  }
}
class MockUnivRepository {}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {provide: getRepositoryToken(User), useClass: MockUserRepository},
        {provide: getRepositoryToken(Univ), useClass: MockUnivRepository},
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findUserByKakaoId은 카카오 ID로 유저 정보 조회', () => {
    expect(service.findUserByKakaoId('test')).resolves.toStrictEqual({
      id: 1,
      nickname: 'test',
      kakaoAccount: 'test',
      vaccination: 'NO',
      deviceId: 'test',
      locationId: 1,
    });
  });
  it('findUserByKakaoId은 유저를 찾지 못하면 null을 반환해야함', () => {
    expect(service.findUserByKakaoId('t')).resolves.toStrictEqual(null);
  });
});
