# 🧭PathFinder🧭
Pathfinder는 위드코로나 이후 맞이할 변화에 대한 정확한 이해를 통해 모두가 일상으로 돌아갈 수 있는 서비스를 제공하고자 합니다.  
우리의 열정으로 “모두가 일상“으로 한발짝 다가갈 수 있도록 변화를 돕고 싶습니다

## PathFinder 팀원
- 🖐 박효진: 기획
- 🖐 이소희: 디자인
- 🖐 이동주: 개발(앱)
- 🖐 호선우: 개발(서버)

## AhChaCha 서비스 소개
### 모두를 일상으로
‘AhChAChA(아차차)’는 “모두를 일상으로” 라는 MISSION을 가진 서비스 입니다. 위드코로나 시행 후, 백신패스 (혹은 방역패스)를 잘 소지하는 것이 일상으로 회복할 수 있는 핵심 요소입니다. 그 중 PCR검사결과를 통한 방역패스의 경우, 보건복지부에서 제시한 ‘48시간’이라는 시간을 관리하는 것이 특히 중요합니다.   
‘AhChAChA(아차차)’는 48시간이라는 PCR검사결과 유효시간을 효율적으로 관리해주어 모든 사람이 일상으로 회복하는 부스터가 되고자 합니다.
## 주요기능 소개
✔ **PCR 검사 결과 경과 시간 알림 서비스**   
  PCR 검사 결과 음성을 통보 받은 시점으로부터 검사 결과가 유효한 만료일까지 남은 시간을 알려줍니다.  
✔ **PCR 검사 알림 예약 서비스**   
캘린더 및 알림 서비스를 통해 앞으로 받을 PCR 검사를 알려줍니다.    
✔ **가까운 선별진료소 추천 서비스**  
사용자의 현재 위치에서 반경 5KM내에 선별진료소를 추천해줍니다.  
✔ **학교 게시판 서비스**   
같은 학교 내에서 사용자들 사이의 코로나에 대한 의견을 공유할 수 있습니다.

## Quick Start
`node`: 14.16.0  
`npm`: 6.14.11  
⛏ 로컬 서버
```
git clone https://github.com/hacareer/ahchacha-backend.git
cd ahchacha-backend
npm install
npm run start
```
🛠 테스트 서버
 ```
 http://13.125.231.69
 ```
## ERD
![image](https://user-images.githubusercontent.com/66551410/143317686-37ad8307-d557-48d7-bf06-2d14bc4eb5d8.png)
## Server 아키텍쳐
![image](https://user-images.githubusercontent.com/66551410/143316350-74f983ff-01bd-4dba-bbb3-4abcb88862bf.png)
## Swagger
```
 http://13.125.231.69/api/docs
```
