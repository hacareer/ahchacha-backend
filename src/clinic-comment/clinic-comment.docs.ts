import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {ClinicCommentController} from './clinic-comment.controller';
import {CreateCinicCommentResponseBodyDto} from './dto/create-clinic-comment.dto';
import {CountContentsResponseBodyDto} from './dto/count-contents.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<ClinicCommentController> = {
  createClinicComment(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '선별진료소 후기 정보를 생성하는 API 입니다.  <br />' +
          "UnivCommentTag { 'T1' (검사가 빨리 끝나요) / 'T2' (교통이 불편해요) / 'T3' (늦게까지 해요) / 'T4' (근처에 주차공간이 있어요) / 'T5' (검사자수가 많아요) }",
      }),
      ApiResponse({
        status: 201,
        type: CreateCinicCommentResponseBodyDto,
        description: '선별진료소 후기 정보가 성공적으로 생성되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  countContents(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '선별진료소에 해당하는 후기 개수를 조회합니다.<br />' +
          "UnivCommentTag { 'T1' (검사가 빨리 끝나요) / 'T2' (교통이 불편해요) / 'T3' (늦게까지 해요) / 'T4' (근처에 주차공간이 있어요) / 'T5' (검사자수가 많아요) }",
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
        type: CountContentsResponseBodyDto,
        description: '선별진료소 후기 개수가 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
