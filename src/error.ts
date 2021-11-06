export const Err = {
  USER: {
    EXISTING_USER_NICKNAME: {
      code: 400,
      message: '이미 존재하는 닉네임 입니다.',
    },
    NOT_FOUND: {
      code: 400,
      message: '사용자가 존재하지 않습니다.',
    },
  },
  TOKEN: {
    INVALID_TOKEN: {
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    },
    JWT_EXPIRED: {
      code: 410,
      message: '토큰이 만료되었습니다.',
    },
    NO_PERMISSION: {
      code: 403,
      message: '해당 요청의 권한이 없습니다',
    },
    NOT_SEND_REFRESH_TOKEN: {
      code: 401,
      message: 'Refresh Token 전송 안됨',
    },
    NOT_SEND_TOKEN: {
      code: 401,
      message: 'Token 전송 안됨',
    },
  },
  KAKAO: {
    NOT_FOUND: {
      code: 400,
      message: '존재하지 않는 카카오 계정입니다.',
    },
  },
};
