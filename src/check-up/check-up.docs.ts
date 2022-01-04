import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {CheckUpController} from './check-up.controller';
import {DeleteCheckUpResponseBodyDto} from './dto/delete-check-up-response.dto';
import {CreateCheckUpResponseBodyDto} from './dto/create-check-up.dto';
import {findMyCheckUpResponseBodyDto} from './dto/find-my-check-up.dto';
import {UpdateCheckUpResponseBodyDto} from './dto/update-check-up.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<CheckUpController> = {
  createCheckUp(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '검사 예약 정보를 생성합니다.<br />' +
          "NotificationTime { '15M' / '30M' / '1H' / '1D' }",
      }),
      ApiResponse({
        status: 201,
        description: '검사 예약 정보가 성공적으로 생성되었습니다.',
        type: CreateCheckUpResponseBodyDto,
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findMyCheckUp(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 모든 검사 예약 정보를 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        type: findMyCheckUpResponseBodyDto,
        description:
          '사용자의 모든 검사 예약 정보를 성공적으로 조회하였습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findCheckUpbyId(summary: string) {
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
        type: findMyCheckUpResponseBodyDto,
        description: '사용자의 검사 예약 정보를 성공적으로 조회하였습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  updateCheckUp(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자의 검사 예약 정보를 갱신합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '사용자의 검사 예약 정보를 성공적으로 갱신하였습니다.',
        type: UpdateCheckUpResponseBodyDto,
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  deleteCheckUp(summary: string) {
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
        type: DeleteCheckUpResponseBodyDto,
        description: '사용자의 검사 예약 정보를 성공적으로 삭제하였습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
