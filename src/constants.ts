enum Vaccination {
  YES = 'YES', // 백신 2차 접종자
  NO = 'NO', // 백신 2차 미접종자
}

enum Label {
  TEMPORARY = 'TEMPORARY',
  PERMANENT = 'PERMANENT',
}

enum ClinicTag {
  '검사가 빨리 끝나요' = 'T1',
  '교통이 불편해요' = 'T2',
  '늦게까지 해요' = 'T3',
  '근처에 주차공간이 있어요' = 'T4',
  '검사자수가 많아요' = 'T5',
}

enum UnivTag {
  '백신미접종자 차별 화나요' = 'T1',
  '저는 이제 백신 다 맞았어요' = 'T2',
  '백신 아직 불안해요' = 'T3',
  '마스크 불편해요' = 'T4',
  '대면 수업 힘들어요' = 'T5',
}

export {Vaccination, ClinicTag, UnivTag, Label};
