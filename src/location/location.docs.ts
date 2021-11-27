import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {CreateLocationDto} from './dto/create-location.dto';
import {LocationController} from './location.controller';
import {BaseUpdateResponseDto} from './../common/dto/base-update-response.dto';
import {ChangeAddressToCoordinateDto} from './dto/change-address-to-coordinate.dto';
import {CreateLocationResponseDto} from './response-dto/create-location-response.dto';
import {ChangeAddressToCoordinateResponseDto} from './response-dto/change-addr-to-coor-response.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<LocationController> = {
  create(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자 위치 정보를 생성하는 API 입니다.',
      }),
      ApiResponse({
        status: 201,
        type: CreateLocationResponseDto,
        description: '사용자 위치 정보가 성공적으로 생성되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  getLocInfo(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '위치 정보를 조회하는 API 입니다.',
      }),
      ApiParam({
        name: 'locationId',
        required: true,
        type: Number,
        description: '위치 ID',
        example: '1',
      }),
      ApiResponse({
        status: 200,
        type: CreateLocationResponseDto,
        description: '위치 정보가 성공적으로 조회되었습니다.',
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
        description: '위치 정보를 갱신하는 API 입니다.',
      }),
      ApiParam({
        name: 'locationId',
        required: true,
        type: Number,
        description: '위치 ID',
        example: '1',
      }),
      ApiResponse({
        status: 200,
        type: BaseUpdateResponseDto,
        description: '위치 정보가 성공적으로 갱신되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  changeAddresstoCoordinate(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '주소를 위도, 경도로 변환해주는 API 입니다.',
      }),
      ApiResponse({
        status: 201,
        type: ChangeAddressToCoordinateResponseDto,
        description: '위치 정보가 성공적으로 갱신되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
