import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiQuery, ApiParam} from '@nestjs/swagger';
import {UnivController} from './univ.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<UnivController> = {
  findAll(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '모든 학교정보를 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '학교정보가 정상적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findByUnivId(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '학교 ID를 사용해서 학교정보를 조회합니다.',
      }),
      ApiParam({
        name: 'univId',
        required: true,
        type: Number,
        description: '학교 ID',
        example: '1',
      }),
      ApiResponse({
        status: 200,
        description: '학교정보가 정상적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findByName(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 단어로 시작하는 학교정보를 조회합니다.',
      }),
      ApiQuery({
        name: 'word',
        required: true,
        type: String,
        description: '조회하고 싶은 단어',
        example: '서울',
      }),
      ApiResponse({
        status: 200,
        description: '학교정보가 정상적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
