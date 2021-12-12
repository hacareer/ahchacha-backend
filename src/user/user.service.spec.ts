import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {UserRepository} from './user.repository';
import * as faker from 'faker';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('카카오Id로 유저 정보 조회', () => {
    it('존재하지 않는 유저 정보를 조회할 경우 null이 반환된다', async () => {
      const kakaoId = faker.datatype.IsString();

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(undefined);

      try {
        await userService.findUserByKakaoId(kakaoId);
      } catch (e) {
        expect(e).toBeInstanceOf(null);
      }

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          kakaoAccount: kakaoId,
        },
      });
    });

    //   it('유저 정보를 조회해서 가져올 수 있다', async () => {
    //     const userId = faker.datatype.number();

    //     const existingUser = User.of({
    //       id: userId,
    //       firstName: faker.lorem.sentence(),
    //       lastName: faker.lorem.sentence(),
    //       isActive: true,
    //     });

    //     const userRepositoryFindOneSpy = jest
    //       .spyOn(userRepository, 'findOne')
    //       .mockResolvedValue(existingUser);

    //     const result = await userService.getUserById(userId);

    //     expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
    //       where: {
    //         id: userId,
    //       },
    //     });
    //     expect(result).toBe(existingUser);
    //   });
    // });

    // describe('유저 정보 수정', () => {
    //   it('존재하지 않는 유저 정보를 수정할 경우 NotFoundError가 반환된다', async () => {
    //     const userId = faker.datatype.number();

    //     const requestDto: UserUpdateRequestDto = {
    //       firstName: faker.lorem.sentence(),
    //       lastName: faker.lorem.sentence(),
    //       isActive: false,
    //     };

    //     const userRepositoryFindOneSpy = jest
    //       .spyOn(userRepository, 'findOne')
    //       .mockResolvedValue(undefined);

    //     try {
    //       await userService.updateUser(userId, requestDto);
    //     } catch (e) {
    //       expect(e).toBeInstanceOf(NotFoundException);
    //       expect(e.message).toBe(Message.NOT_FOUND_USER);
    //     }

    //     expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
    //       where: {
    //         id: userId,
    //       },
    //     });
    //   });

    //   it('유저 정보가 수정된다', async () => {
    //     const userId = faker.datatype.number();

    //     const requestDto: UserUpdateRequestDto = {
    //       firstName: faker.lorem.sentence(),
    //       lastName: faker.lorem.sentence(),
    //       isActive: false,
    //     };

    //     const existingUser = User.of({
    //       id: userId,
    //       firstName: faker.lorem.sentence(),
    //       lastName: faker.lorem.sentence(),
    //       isActive: true,
    //     });

    //     const savedUser = User.of({
    //       id: userId,
    //       ...requestDto,
    //     });

    //     const userRepositoryFindOneSpy = jest
    //       .spyOn(userRepository, 'findOne')
    //       .mockResolvedValue(existingUser);

    //     const userRepositorySaveSpy = jest
    //       .spyOn(userRepository, 'save')
    //       .mockResolvedValue(savedUser);

    //     const result = await userService.updateUser(userId, requestDto);

    //     expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
    //       where: {
    //         id: userId,
    //       },
    //     });
    //     expect(userRepositorySaveSpy).toHaveBeenCalledWith(savedUser);
    //     expect(result).toEqual(savedUser);
    //   });
    // });

    // describe('유저 정보 삭제', () => {
    //   it('유저 정보가 삭제된다', async () => {
    //     const userId = faker.datatype.number();

    //     const userRepositoryDeleteSpy = jest
    //       .spyOn(userRepository, 'delete')
    //       .mockResolvedValue({} as DeleteResult);

    //     const result = await userService.removeUser(userId);

    //     expect(userRepositoryDeleteSpy).toHaveBeenCalledWith(userId);
    //     expect(result).toBe(undefined);
    //   });
  });
});
