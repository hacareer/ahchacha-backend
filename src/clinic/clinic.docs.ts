import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {ClinicController} from './clinic.controller';
import {CreateClinicResponseDto} from './response-dto/create-clinic-hour.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<ClinicController> = {
  findByName(summary) {
    return applyDecorators(
      ApiBearerAuth(),
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
        type: CreateClinicResponseDto,
        description: '선별진료소 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findNearBy5Km(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '위도와 경도를 사용해서 반경 5KM내에 위치한 선별진료소를 조회합니다.',
      }),
      ApiParam({
        name: 'lat',
        required: true,
        description: '위도',
        example: '37.50832',
      }),
      ApiParam({
        name: 'lng',
        required: true,
        description: '경도',
        example: '127.011803',
      }),
      ApiResponse({
        status: 200,
        type: CreateClinicResponseDto,
        description: '선별진료소 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findOne(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
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
        type: CreateClinicResponseDto,
        description: '선별진료소 정보가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
