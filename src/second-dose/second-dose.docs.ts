import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {SecondDoseController} from './second-dose.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<SecondDoseController> = {
  create(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '백신 접종 정보를 생성하는 API 입니다.',
      }),
      ApiResponse({
        status: 201,
        description: '백신 접종 정보가 정상적으로 생성되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  countByUniv(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '학교와 기간에 해당하는 접종자 수를 조회합니다.',
      }),
      ApiParam({
        name: 'univId',
        required: true,
        type: String,
        description: '학교 ID',
        example: '1',
      }),
      ApiQuery({
        name: 'from',
        required: true,
        type: String,
        description: '기간의 시작',
        example: '2021-01-01',
      }),
      ApiQuery({
        name: 'to',
        required: true,
        type: String,
        description: '기간의 끝',
        example: '2021-01-10',
      }),
      ApiResponse({
        status: 200,
        description: '접종자 수가 정상적으로 조회되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
