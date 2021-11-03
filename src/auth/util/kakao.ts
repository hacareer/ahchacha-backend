const verifyKakao = (() => {
  const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

  return async (access_token) => {
    try {
      return await fetch(userInfoUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${access_token}`,
        },
      }).then((res) => res.json());
    } catch (e) {
      // logger.info('error', e);
    }
  };
})();

export default verifyKakao;
