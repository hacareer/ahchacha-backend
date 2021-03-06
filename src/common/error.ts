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
    EXISTING_USER: {
      code: 400,
      message: '이미 존재하는 사용자입니다.',
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
    JWT_NOT_REISSUED: {
      code: 405,
      message: '토큰 만료 7일전부터 갱신이 가능합니다.',
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
    INVALID_TOKEN: {
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    },
  },
  UNIV: {
    NOT_FOUND: {
      code: 400,
      message: '학교가 존재하지 않습니다.',
    },
  },
  LOCATION: {
    NOT_FOUND: {
      code: 400,
      message: '위치가 존재하지 않습니다.',
    },
  },
  CLINIC: {
    NOT_FOUND: {
      code: 400,
      message: '선별진료소가 존재하지 않습니다.',
    },
  },
  CHECK_UP: {
    NOT_FOUND: {
      code: 400,
      message: '검사일정이 존재하지 않습니다.',
    },
  },
  SERVER: {
    UNEXPECTED_ERROR: {
      code: 500,
      message: '예기치 못한 못한 서버에러가 발생했습니다.',
    },
    NOT_SEND_MAIL_ERROR: {
      code: 500,
      message: '메일 전송 중 에러가 발생하였습니다.',
    },
  },
};
