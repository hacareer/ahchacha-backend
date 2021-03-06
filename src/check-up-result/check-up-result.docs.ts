import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {CheckUpResultController} from './check-up-result.controller';
import {CreateCheckUpResponseBodyDto} from './../check-up/dto/create-check-up.dto';
import {GetCheckUpResultResponsBodyeDto} from './dto/get-check-up-result.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<CheckUpResultController> = {
  createCheckUpResult(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '검사 결과 정보를 생성하는 API 입니다.',
      }),
      ApiResponse({
        status: 201,
        type: CreateCheckUpResponseBodyDto,
        description: '검사 결과 정보가 성공적으로 생성되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  getCheckUpResult(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '기간에 해당하는 검사 결과를 조회합니다.',
      }),
      ApiQuery({
        name: 'from',
        required: false,
        description: '기간의 시작',
        example: '2021-01-01 00:00',
      }),
      ApiQuery({
        name: 'to',
        required: false,
        description: '기간의 끝',
        example: '2021-01-10 00:00',
      }),
      ApiResponse({
        status: 200,
        type: GetCheckUpResultResponsBodyeDto,
        description: '검사 결과 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
