import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {UnivCommentController} from './univ-comment.controller';
import {CreateUnivCommentResponseDto} from './response-dto/create-univ-comment.dto';
import {GetUnivCommentResponseDto} from './response-dto/get-univ-comment-response.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<UnivCommentController> = {
  create(summary) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '학교 댓글을 생성하는 API 입니다. <br />' +
          " UnivCommentTag { 'T1' (백신미접종자 차별 화나요) / 'T2' (저는 이제 백신 다 맞았어요) / 'T3' (백신 아직 불안해요) / 'T4' (마스크 불편해요) / 'T5' (대면 수업 힘들어요) }",
      }),
      ApiResponse({
        status: 201,
        type: CreateUnivCommentResponseDto,
        description: '학교 댓글이 성공적으로 생성되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
  findAllByUnivId(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '해당 학교의 댓글을 조회합니다. <br />' +
          "UnivCommentTag { '백신미접종자 차별 화나요' = 'T1',  '저는 이제 백신 다 맞았어요' = 'T2',   '백신 아직 불안해요' = 'T3',   '마스크 불편해요' = 'T4',   '대면 수업 힘들어요' = 'T5'}",
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
        type: GetUnivCommentResponseDto,
        description: '해당 학교의 댓글이 성공적으로 조회되었습니다.',
      }),
      ApiResponse({status: 400, description: 'Token 전송 안됨'}),
      ApiResponse({status: 401, description: '유효하지 않은 토큰입니다.'}),
      ApiResponse({status: 410, description: '토큰이 만료되었습니다.'}),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
    );
  },
};
