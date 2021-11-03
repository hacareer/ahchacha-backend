export const Err = {
  USER: {},
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
  },
};
