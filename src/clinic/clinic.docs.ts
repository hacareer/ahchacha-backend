import {applyDecorators} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiQuery, ApiParam} from '@nestjs/swagger';
import {ClinicController} from './clinic.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<ClinicController> = {
  findByName(summary) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '해당 단어로 시작하는 선별진료소를 조회합니다.',
      }),
      ApiQuery({
        name: 'word',
        required: true,
        description: '조회하고 싶은 단어',
        example: '강남',
      }),
      ApiResponse({
        status: 200,
        description: '선별진료소 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findNearBy5Km(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '사용자 위치의 경도와 위도를 사용해서 반경 5KM내에 위치한 선별진료소를 조회합니다.',
      }),
      ApiParam({
        name: 'lat',
        required: true,
        description: '사용자 위치의 위도',
        example: '37.50832',
      }),
      ApiParam({
        name: 'lng',
        required: true,
        description: '사용자 위치의 경도',
        example: '127.011803',
      }),
      ApiResponse({
        status: 200,
        description: '선별진료소 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '선별진료소 ID를 사용해서 사용자 정보를 조회합니다.',
      }),
      ApiParam({
        name: 'clinicId',
        required: true,
        type: Number,
        description: '선별진료소 ID',
        example: '1',
      }),
      ApiResponse({
        status: 200,
        description: '선별진료소 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
