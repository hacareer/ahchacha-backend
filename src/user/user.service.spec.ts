import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
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

  describe('유저 확인', () => {
    it('카카오 아이디로 유저를 확인한다', async () => {
      const kakaoId = faker.lorem.sentence();
      const lastName = faker.lorem.sentence();

      const requestDto: UserCreateRequestDto = {
        firstName: firstName,
        lastName: lastName,
      };

      const createdUserEntity = User.of(requestDto);

      const savedUser = User.of({
        id: faker.datatype.number(),
        firstName: firstName,
        lastName: lastName,
        isActive: true,
      });

      const userRepositoryCreateSpy = jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(createdUserEntity);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const result = await userService.createUser(requestDto);

      expect(userRepositoryCreateSpy).toBeCalledWith(requestDto);
      expect(userRepositorySaveSpy).toBeCalledWith(createdUserEntity);
      expect(result).toEqual(savedUser);
    });
  });

  describe('유저 목록 조회', () => {
    it('모든 유저 정보를 조회해서 가져올 수 있다', async () => {
      const existingUserList = [
        User.of({
          id: faker.datatype.number(),
          firstName: faker.lorem.sentence(),
          lastName: faker.lorem.sentence(),
          isActive: true,
        }),
        User.of({
          id: faker.datatype.number(),
          firstName: faker.lorem.sentence(),
          lastName: faker.lorem.sentence(),
          isActive: true,
        }),
      ];

      const userRepositoryFindSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValue(existingUserList);

      const result = await userService.getUsers();

      expect(userRepositoryFindSpy).toBeCalled();
      expect(result).toBe(existingUserList);
    });
  });

  describe('유저 정보 조회', () => {
    it('존재하지 않는 유저 정보를 조회할 경우 NotFoundError가 반환된다', async () => {
      const userId = faker.datatype.number();

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(undefined);

      try {
        await userService.getUserById(userId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(Message.NOT_FOUND_USER);
      }

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
    });

    it('유저 정보를 조회해서 가져올 수 있다', async () => {
      const userId = faker.datatype.number();

      const existingUser = User.of({
        id: userId,
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: true,
      });

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      const result = await userService.getUserById(userId);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
      expect(result).toBe(existingUser);
    });
  });

  describe('유저 정보 수정', () => {
    it('존재하지 않는 유저 정보를 수정할 경우 NotFoundError가 반환된다', async () => {
      const userId = faker.datatype.number();

      const requestDto: UserUpdateRequestDto = {
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: false,
      };

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(undefined);

      try {
        await userService.updateUser(userId, requestDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(Message.NOT_FOUND_USER);
      }

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
    });

    it('유저 정보가 수정된다', async () => {
      const userId = faker.datatype.number();

      const requestDto: UserUpdateRequestDto = {
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: false,
      };

      const existingUser = User.of({
        id: userId,
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: true,
      });

      const savedUser = User.of({
        id: userId,
        ...requestDto,
      });

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const result = await userService.updateUser(userId, requestDto);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
      expect(userRepositorySaveSpy).toHaveBeenCalledWith(savedUser);
      expect(result).toEqual(savedUser);
    });
  });

  describe('유저 정보 삭제', () => {
    it('유저 정보가 삭제된다', async () => {
      const userId = faker.datatype.number();

      const userRepositoryDeleteSpy = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({} as DeleteResult);

      const result = await userService.removeUser(userId);

      expect(userRepositoryDeleteSpy).toHaveBeenCalledWith(userId);
      expect(result).toBe(undefined);
    });
  });
});
