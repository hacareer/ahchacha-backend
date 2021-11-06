import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
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
      ApiResponse({status: 403, description: 'Forbidden.'}),
    );
  },
  findByName(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '운동 기록을 조회합니다. 최신 운동기록 조회는 duration를 사용해주세요. 기간내 운동기록 조회는 from, to를 사용해주세요.',
      }),
      ApiQuery({
        name: 'exerciseIdList',
        required: true,
        type: String,
        description: '조회하고 싶은 운동 Id 목록',
        example: '1,2',
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
        description:
          '운동 기록을 조회합니다. 최신 운동기록 조회는 duration를 사용해주세요. 기간내 운동기록 조회는 from, to를 사용해주세요.',
      }),
      ApiQuery({
        name: 'exerciseIdList',
        required: true,
        type: String,
        description: '조회하고 싶은 운동 Id 목록',
        example: '1,2',
      }),
      ApiResponse({
        status: 200,
        description: '학교정보가 정상적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
