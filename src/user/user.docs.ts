import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {UserController} from './user.controller';
import {validateUserResponseDto} from './responseDto/validateUserResponse.dto';
import {registerUserResponseDto} from './responseDto/registerUserReponse.dto';
import {refreshAccessTokenDto} from './responseDto/refreshAccessToken.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<UserController> = {
  validateUser(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '가입된 사용자일 경우 accessToken, reFreshToken을 발급합니다. 새로운 사용자일 경우 onceToken을 발급합니다.',
      }),
      ApiResponse({
        status: 201,
        type: validateUserResponseDto,
        description: '정상적으로 토큰이 발급되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다.'}),
    );
  },
  registUser(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '회원가입을 진행합니다. 사용자 등록 후 accessToken, reFreshToken을 발급합니다.',
      }),
      ApiResponse({
        status: 201,
        type: registerUserResponseDto,
        description: '회원가입이 완료되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  refreshAccessToken(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: 'reFreshToken을을 이용해 accessToken을 재발급합니다',
      }),
      ApiResponse({
        status: 200,
        type: refreshAccessTokenDto,
        description: 'accessToken을 재발급되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findUserById(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자 ID를 사용해서 사용자 정보를 조회합니다.',
      }),
      ApiParam({
        name: 'id',
        required: true,
        type: String,
        description: '사용자 ID',
        example: '1',
      }),
      ApiResponse({
        status: 200,
        description: '해당 사용자 정보가 정상적으로 조회되었습니다.',
      }),
      ApiResponse({status: 2, description: '사용자가 존재하지 않습니다.'}),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  checkUserBynickname(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '해당 닉네임을 사용하고 있는 유저가 있는지 조회합니다.',
      }),
      ApiParam({
        name: 'nickname',
        required: true,
        type: String,
        description: '사용자 닉네임',
        example: 'test',
      }),
      ApiResponse({
        status: 200,
        description: '해당 닉네임을 사용하고 있는 사용자가 없습니다.',
      }),
      ApiResponse({status: 1, description: '이미 존재하는 닉네임 입니다.'}),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다ㄴ'}),
    );
  },
};
