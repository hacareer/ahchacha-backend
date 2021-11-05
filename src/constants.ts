enum Vaccination {
  YES = 'YES', // 백신 2차 접종자
  NO = 'NO', // 백신 2차 미접종자
}

enum Label {
  TEMPORARY = 'TEMPORARY',
  PERMANENT = 'PERMANENT',
}

enum ClinicTag {
  '검사가 빨리 끝나요' = '검사가 빨리 끝나요',
  '교통이 불편해요' = '교통이 불편해요',
  '늦게까지 해요' = '늦게까지 해요',
  '근처에 주차공간이 있어요' = '근처에 주차공간이 있어요',
  '검사자수가 많아요' = '검사자수가 많아요',
}

enum UnivTag {
  '백신미접종자 차별 화나요' = '백신미접종자 차별 화나요',
  '저는 이제 백신 다 맞았어요' = '저는 이제 백신 다 맞았어요',
  '백신 아직 불안해요' = '백신 아직 불안해요',
  '마스크 불편해요' = '마스크 불편해요',
  '대면 수업 힘들어요' = '대면 수업 힘들어요',
}

export {Vaccination, ClinicTag, UnivTag, Label};
