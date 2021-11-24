import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {CheckUpController} from './check-up.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<CheckUpController> = {
  create(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '검사 예약 정보를 생성합니다.',
      }),
      ApiResponse({
        status: 201,
        description: '검사 예약 정보가 성공적으로 생성되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findAllByUser(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 모든 검사 예약 정보를 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        description:
          '사용자의 모든 검사 예약 정보를 성공적으로 조회하였습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findOneByUse(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 검사 예약 정보를 조회합니다.',
      }),
      ApiParam({
        name: 'checkUpId',
        required: true,
        type: Number,
        description: '검사 예약 ID',
        example: '1',
      }),
      ApiResponse({
        status: 200,
        description: '사용자의 검사 예약 정보를 성공적으로 조회하였습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  update(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 검사 예약 정보를 갱신합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '사용자의 검사 예약 정보를 성공적으로 갱신하였습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  remove(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 검사 예약 정보를 삭제합니다.',
      }),
      ApiParam({
        name: 'checkUpId',
        required: true,
        type: Number,
        description: '검사 예약 ID',
        example: '1',
      }),
      ApiResponse({
        status: 200,
        description: '사용자의 검사 예약 정보를 성공적으로 삭제하였습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
