import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {UserController} from './user.controller';
import {GetMyInfoResponseBodyDto} from './dto/get-my-info.dto';
import {SignInResponseBodyDto} from './dto/sign-in.dto';
import {RegisterUserResponseBodyDto} from './dto/register-user.dto';
import {GetAccessTokenResponseBodyDto} from './dto/get-access-token.dto';
import {GetRefreshTokenResponseBodyDto} from './dto/get-refresh-token.dto';
import {
  UpdateMyInfoResponseDto,
  UpdateMyInfoResponseBodyDto,
} from './dto/update-my-info.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<UserController> = {
  signIn(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '가입된 사용자일 경우 access token, refresh token을 반환합니다. <br /> 새로운 사용자일 경우 once token을 반환합니다.',
      }),
      ApiResponse({
        status: 201,
        type: SignInResponseBodyDto,
        description: '정상적으로 토큰이 발급되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다.'}),
      ApiResponse({status: 500, description: '유효하지 않은 토큰입니다.'}),
    );
  },
  registUser(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '회원가입을 진행합니다. <br /> 회원가입 완료 후 access token, refresh token을 반환합니다. <br />' +
          "enum Vaccination { YES = 'YES',  NO = 'NO' }",
      }),
      ApiResponse({
        status: 201,
        type: RegisterUserResponseBodyDto,
        description: '회원가입이 완료되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  getAccessToken(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          'refresh token을 사용해서 access token을 발급합니다 <br /> 발급된 access token은 15분간 유효합니다.',
      }),
      ApiResponse({
        status: 200,
        type: GetAccessTokenResponseBodyDto,
        description: 'refreshToken이 재발급되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  getRefreshToken(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '기존 refresh token을 사용해서 새로운 refresh token을 재발급합니다. <br /> refresh token은 2주간 유효하며, refresh token 만료가 1주일 이내로 남은 시점에서 토큰 갱신 요청을 하면 갱신된 access token과 갱신된 refresh token이 함께 반환됩니다. ',
      }),
      ApiResponse({
        status: 200,
        type: GetRefreshTokenResponseBodyDto,
        description: 'refreshToken을 재발급되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({
        status: 405,
        description: '토큰 만료 7일전부터 갱신이 가능합니다.',
      }),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  getMyInfo(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '현재 로그인한 사용자의 정보를 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        type: GetMyInfoResponseBodyDto,
        description: '사용자 정보가 정상적으로 조회되었습니다.',
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
  updateMyInfo(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자 정보를 갱신하는 API 입니다.',
      }),
      ApiResponse({
        status: 200,
        type: UpdateMyInfoResponseBodyDto,
        description: '사용자 정보가 성공적으로 갱신되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다ㄴ'}),
    );
  },
};
