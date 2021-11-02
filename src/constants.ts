enum Vaccination {
  YES = 'YES', // 백신 2차 접종자
  NO = 'NO', // 백신 2차 미접종자
}

enum Result {
  YES = 'YES', // PCR 검사 결과 양성
  NO = 'NO', // PCR 검사 결과 음성
}

enum Label {
  TEMPORARY = 'TEMPORARY',
  PERMANENT = 'PERMANENT',
}

export { Vaccination, Result, Label };
