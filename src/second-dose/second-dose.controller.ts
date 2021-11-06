import {
  Controller,
  Get,
  Post,
  Req,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import {SecondDoseService} from './second-dose.service';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {ApiDocs} from './second-dose.docs';
import {ApiTags} from '@nestjs/swagger';

@Controller('second-dose')
@ApiTags('second-dose')
export class SecondDoseController {
  constructor(private readonly secondDoseService: SecondDoseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiDocs.create('접종 정보 생성 API')
  create(@User() user) {
    return this.secondDoseService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':univId')
  @ApiDocs.countByUniv('학교별 접종자수 조회 API')
  countByUniv(
    @Param('univId') univId: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.secondDoseService.countByUniv(univId, from, to);
  }
}
