import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {CheckUpResultController} from './check-up-result.controller';
import {CreateCheckUpResultResponseDto} from './response-dto/create-check-up-result-response.dto';
import {GetCheckUpResultResponseDto} from './response-dto/get-check-up-result-response.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<CheckUpResultController> = {
  create(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '검사 결과 정보를 생성하는 API 입니다.',
      }),
      ApiResponse({
        status: 201,
        type: CreateCheckUpResultResponseDto,
        description: '검사 결과 정보가 성공적으로 생성되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  searchCheckUpResultByDate(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '기간에 해당하는 검사 결과를 조회합니다.',
      }),
      ApiQuery({
        name: 'from',
        required: true,
        description: '기간의 시작',
        example: '2021-01-01 00:00',
      }),
      ApiQuery({
        name: 'to',
        required: true,
        description: '기간의 끝',
        example: '2021-01-10 00:00',
      }),
      ApiResponse({
        status: 200,
        type: GetCheckUpResultResponseDto,
        description: '검사 결과 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
