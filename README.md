# 손길

## 1️⃣ 손길 소개 및 시연 영상

### Overview

기존 농인들이 이용하던 통신중계서비스인 ‘손말이음센터’의 간편화를 통한 농인의 사회적 서비스 이용 편리화

## 2️⃣ 서비스 화면

### 사용자

#### 메인 - 통역 서비스 선택 버튼

![ezgif.com-video-to-gif__1_](/uploads/269d94532492f930b0b71351786f51b4/ezgif.com-video-to-gif__1_.gif)


#### 매칭 대기화면

![손길_-_Chrome_2023-02-15_오후_2_24_23](/uploads/982657d50516d9df6b834f0b264453ff/손길_-_Chrome_2023-02-15_오후_2_24_23.png)

### 통역사

#### 통역사 로그인 화면

![손길_-_Chrome_2023-02-15_오후_2_21_59](/uploads/9af7e6e3960122ca7abbce7159e022a5/손길_-_Chrome_2023-02-15_오후_2_21_59.png)

#### 통역사 매칭리스트 화면

![손길_-_Chrome_2023-02-15_오후_2_22_54](/uploads/e7025e709cdbc064cb70882cf0ab426c/손길_-_Chrome_2023-02-15_오후_2_22_54.png)

![손길_-_Chrome_2023-02-15_오후_2_24_32](/uploads/633c6cc6d72bace3acae8880c9b837cf/손길_-_Chrome_2023-02-15_오후_2_24_32.png)

#### 매칭성공 화면

![손길_-_Chrome_2023-02-15_오후_3_03_58](/uploads/51df1696d067f69f797d857b53fb0402/손길_-_Chrome_2023-02-15_오후_3_03_58.png)

![손길_-_Chrome_2023-02-15_오후_3_15_13](/uploads/5de27f5d82362d1ff8c27a8e486b0b9b/손길_-_Chrome_2023-02-15_오후_3_15_13.png)

#### AI 매칭 화면

![손길_-_Chrome_2023-02-15_오후_3_08_40](/uploads/7c245aefce26e0f1cd9d08f61b12c954/손길_-_Chrome_2023-02-15_오후_3_08_40.png)

#### AI 애니메이션 화면

![ezgif.com-video-to-gif](/uploads/71307ce9cbc1c0a1a712f4c15c76c60f/ezgif.com-video-to-gif.gif)

## 3️⃣ 주요 기능

 

#### 🔶 webRTC를 통한 실시간 화상 통역 매칭 서비스

메인 페이지에서 `통역사 매칭 서비스` 버튼을 누르면 통역사 매칭을 위한 대기 페이지로 이동합니다.

해당 통역 요청이 통역사 페이지에 전달되고 통역사가 `통역수락` 버튼을 누르면 화상 서비스가 실행되면서 수어 통역이 진행됩니다.

#### 🔶 STT를 이용한 대화 내용 인식 및 표시

청인의 음성을 텍스트로 변환하는 기능으로 화상 통역이 진행되는 화면 우측 하단에 있는 음성인식 `Start` 버튼을 누르면 음성인식 기능이 실행되며 텍스트로 확인할 수 있습니다.

#### 🔶 AI를 이용한 수어 → 자막 통역 서비스

메인 페이지에서 `AI 통역 서비스` 버튼을 누르면 AI 수어 번역 기능을 사용할 수 있습니다. 얼굴, 어깨, 팔꿈치, 손이 모두 보이도록 화면을 배치하고 수어를 하면 해당 수어를 텍스트로 변환하여 자막에 띄워주게 됩니다.

#### 🔶 AI를 이용한 음성 → 애니메이션 통역 서비스

AI 통역 서비스 페이지 하단에 `마이크` 아이콘을 누르면 실행되며 음성인식이 시작되고 해당 음성을 애니메이션이 수어로 번역해주는 서비스입니다.



## 4️⃣개발 환경

### Server

```
AWS EC2
 - Ubuntu 20.04 LTS
 - Docker 23.0.1
```

### 형상 관리

```
 - Gitlab
```

### 이슈 관리

```
 - Jira
```

### UI/UX

```
 - figma
```

### DataBase

```
 - MariaDB 10.3
```

### BackEnd

```
 - java open jdk 17
 - Spring Boot 2.7.7
 - Spring Boot Gradle 7.6
 - Spring Data jpa
 - Lombok
 - swagger 2.9.2
 - Spring Sequrity 3.1.1

 - Flask 2.2.2
 - Flask socketIO 5.3.2
 - tensorflow 2.1.0
 - opencv 4.1.0.25
 - kouply 0.6.0
 - mediapipe 0.9.0.1
```

### FrontEnd

```
 - React 18.2.0
 - React-dom 18.2.0
 - Redux 8.0.5
 - react-speech recognition 3.10.0
 - nvm 1.1.10
 - npm 9.4.2
 - node v16.14.2
 - openvidu Browser 2.25.0
 - face-api.js 0.22.2
 - axios 0.19.2
```

### IDE

```
 - InteliJ 2022.3.1
 - Visual Studio Code 1.74.2
```

### Communication

```
 - mattermost
 - notion
```

### OS

```
 - window 10 pro
```

### 애니메이션 제작

```
 - Blender 3.4.1.0
```

### 영상편집

```
 - movavi video Editor 23
```

### 기타 편의 툴

```
 - postman 10.10.1 for Windows
 - sourcetree
```

## 5️⃣Rest API
```
BASE_URL : 'https://i8d204.p.ssafy.io'
1. 로그인: `POST`, '/api/v1/users/login'
{
    'userName': '유저 아이디',
    'password' : '비밀번호'
}, 
헤더 : {
            headers: { 'Content-Type': 'application/json', },
}
반환값 : 



2. : `POST`, '/mapping/login/user'
{
    sessionIdentity: '세션 ID'
}, 
헤더 : {
            headers: { 'Content-Type': 'application/json', },
}
반환값 : 

3. : `POST`, '/api/sessions'
{
            customSessionId: '세션 아이디'
}, 
헤더 : {
            headers: { 'Content-Type': 'application/json', },
}
반환값 : 

4. : `POST`, '/api/sessions/{세션 ID}/connections'
헤더 : {
    headers: { 'Content-Type': 'application/json', },
}
반환값 : 

5. : `GET`, '/ai/recording/analyze?speech={음성 인식 데이터}'
반환값 :  "형태소1 형태소2 형태소3"
```
## 6️⃣ERD
![Image_Pasted_at_2023-2-16_10-38](/uploads/5a1043bc6878264c5e3cc9316c7a02ca/Image_Pasted_at_2023-2-16_10-38.png)


## 7️⃣와이어 프레임

![Design system for React   Figma  Web app templates (Community)2](https://user-images.githubusercontent.com/53904156/218961580-69f0958d-7f4b-438b-9e2d-1094ba415893.png)
<br />

## 8️⃣Convention

#### Commit Convention

```
[FE/BE]Type - 커밋 제목
```

![image](https://user-images.githubusercontent.com/53904156/218959179-05248b3f-c05b-4d81-bc16-47c732f7ab6c.png)
<br />

1. 커밋 제목 앞에 [FE / BE]를 붙여 프론트엔드인지 백엔드인지 구분
2. Type은 아래와 같이 사용
   
   ```
   feat - 새로운 기능 추가
   fix - 버그 수정
   build - 빌드 관련 파일 수정
   ci - CI 관련 설정 수정
   docs - 문서 (문서 추가, 수정, 삭제)
   style - 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없는 경우)
   refactor - 코드 리팩토링
   test - 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없는 경우)
   comment - 주석 추가, 변경
   remove - 기능 제거 or 파일 삭제만 수행한 경우
   chore - 기타 변경사항 (빌드 스크립트 수정 등)
   css - css파일 수정
   rename - 파일 / 폴더 이름 수정
   ```

## 9️⃣팀 소개

### 프론트

`강인주`, `박채성`, `이지예`

### 백

`이재완`, `최성민`, `홍성민`
<br />

### 팀원별 역할
#### `강인주` - FE 팀장
```
피그마 설계
메인 페이지 UI 제작
통역사 페이지 UI 제작
매칭로딩 페이지 UI 제작
통역사 로그인/로그아웃 기능 구현
서비스 안내영상 제작 및 편집
시나리오 촬영 및 편집
```
#### `박채성` 
```
AI 통역사 (영상 -> 음성) 화면 구성
AI 통역사 (영상 -> 음성) html -> React 리팩토링
AI 통역사 (영상 -> 음성, 음성 -> 애니메이션) 통합 및 화면 구성
프론트엔드 Git merge 관리
최종 발표
``` 
#### `이지예` 
```
Openvidu 담당 
 - 프로젝트 코드에 Openvidu 코드 적용
 - 화상채팅 인원 제한
 - 채팅창 유무에 따른 기능 및 UI 변경
사용자 및 통역사 세션값에 따른 페이지 이동
화상채팅 화면에 STT 기능 도입
```
#### `이재완` - BE 팀장
```
오픈비두
 - 오픈비두 서버 배포
NGINX 설정
 - 80, 443 포트 리다이렉션
 - ssl 인증서 적용
ucc 시나리오 및 콘티 제작
``` 
#### `최성민` 
```
Spring boot 개발환경세팅
Spring boot Security JWT기반 로그인, 회원가입 구현
Spring boot websocket기반 요청알림기능구현
React 요청알림기능 구현
```
#### `홍성민` 
```
AI 통역사(영상 -> 음성) 구현 
AI 통역사(음성 -> 애니메이션) 구현 : 형태소 분석, 단어 맵핑,  Blender 애니메이션 제작
UCC 장소 섭외
UCC 영상 편집
MariaDB, Backend(Spring), Frontend(React), AI Server(Flask) 서버 배포 관리
``` 

### 소감
#### `강인주`
```
프로젝트 기획, 설계, 개발까지 한 단계도 중요하지 않은 과정이 없었다는 것을 많이 알게 된 프로젝트였습니다. 처음에는 기획에 이렇게 많은 시간을 투자할 가치가 있을까라는 생각이 들었습니다.빨리 개발을 진행하는게 더 중요하다고 생각했는데 개발과정에서 길을 헤매일 때 중심을 잡아주는 기준은 왜 이 서비스를 만들고 있는가라는 이유였고 기획단계에서부터 끊임없이 상기해야 하는 이정표 역할이 된다는 것을 알게 되었습니다.

또한 설계를 얼마나 잘 정리해서 공유했는지는 팀원들과의 소통을 얼마나 잘 했는지를 나타내는 기준이라는 생각이 들었습니다. 통역사 매칭을 하기 위해 요청을 처리하는 과정에서 프론트 팀원들과의 엇갈림도 있었고 그로 인해 백엔드 측 로직을 구상하는 과정에서도 혼란이 있었습니다. 팀 프로젝트이기 때문에 더욱 협업의 중요성을 알게된 경험이 되었고 이를 토대로 다음 프로젝트에서는 지라나 노션 등 협업을 위한 툴을 더욱 활용하고 적극적으로 팀원들과 소통하고 싶습니다.

마지막으로 개발을 하면서 이 정도면 괜찮지라고 타협을 하는 제 모습을 발견할 수 있었는데 앞으로의 성장을 방해하는 요인이라는 생각이 들었습니다. 리액트를 처음 사용하면서 익숙치 않은 개념들과 언어가 어려웠고 이런 상황에서 개발을 해야한다는 것이 버거운것도 사실이었지만 팀원들의 도움으로 완벽하지 않더라도 끝까지 포기하지 않고 개발을 하자라는 도전을 했고 공통프로젝트를 잘 마무리 할 수 있었습니다.
```
#### `박채성` 
```
프론트와 백엔드로 구성되는 협업 프로젝트를 이번 공통 프로젝트를 진행하며 처음 수행해 본 것 같습니다. 각자 할 일만 잘 하면 되는 거라고 생각했었지만 이번 프로젝트를 진행하면서 각자의 역할 외에도 팀 적인 부분이 중요하다는 것을 깨달았습니다.

 팀 역할 분배, 설계, 그리고 진행상황 공유 등 여러 부분에서 소통이 잘 안되었을 경우에 효율이 떨어지는 것을 경험했고 프로젝트를 진행해나가며 조금씩 나아지는 것을 느꼈습니다.   

 기획, 설계 개발 순으로 프로젝트를 진행했지만 설계의 미숙함으로 개발 진행 중 프로젝트의 기능을 여럿  갈아엎어야 하는 상황이 나왔습니다. 이 때 저희가 조금 더 설계에 집중하였다면 좀 더 효율적으로 프로젝트를 진행 할 수 있지 않았을까 생각이 많이 들었습니다. 
 
 안드로이드 프로젝트만 진행해왔는데  여러 프로젝트를 폭 넓게 경험해보기 위해 리액트 프로젝트를 선택하였었습니다. 생각했던 것 보다 웹 개발이라는 것이 어렵게 느껴졌고 저와는 맞지 않다고 느꼈습니다. 하지만 리액트를 공부하며 기존에 배웠던 vue, flutter 등 여러 개발 방식과 유사한 부분을 느낄 수 있었고, 다른 개발 플랫폼이라도 어느 정도 비슷한 부분이 있다는 것을 깨닫게 되었습니다. 이번 프로젝트를 경험하며 웹 개발은 저와 맞지 않는 다는 것을 깨닫게 되었지만 좋은 경험이 되었습니다.

 여태까지 기술조사를 잘 못한다고 생각했는데 이번 프로젝트를 진행하면서 다시 한 번 느꼈습니다. AI 기술을 잘 모르다 보니 관련 내용을 조사하는 과정에서 알맞지 않은 정보를 걸러내지 못하는 등 여러 실수가 있었습니다. 검색 능력을 향상 시킬 수 있는 방법을 생각해 봐야 할 것 같습니다.

 팀장님과 함께 프로젝트를 수행하며 간단한 게임과 산책 등 프로젝트 과정에서 약간의 유흥으로 팀 분위기를 화목하게 바꿀 수 있다는 것에서 큰 감명을 받았습니다. 다음 특화 프로젝트를 팀장으로서 진행하는데 이러한 부분을 적용하여 팀을 화목하게 이끌었으면 좋겠습니다.
``` 
#### `이지예` 
```
프로젝트를 진행하며 열심히 하면 할 수 있다는 자신감을 얻게 되었습니다. 
리액트를 사용한 대규모 프로젝트를 처음 해보는 데다가, 오픈비두라는 생소한 플랫폼을 다뤄야 해서 처음에는 자신이 없었습니다. 오픈비두의 코드도 많았고, 막연하게 어려워보였습니다. 그러나 어려워서 못하겠다고 느꼈던 오픈비두 코드를 이해하고 코드를 추가하고 수정하면서 생기는 에러를 해결하는 과정을 통해 아무리 어려워보이는 코드라도 이해할 수 있구나 하는 생각과 열심히 노력하면 해낼 수 있다는 자신감을 얻게 되었습니다.

처음 하는 프로젝트는 기획부터 쉽게 되는 일이 없었지만 그만큼 더 기억에 남을 일들이었고, 배운것이 많았습니다. 팀원들과 서로 도와주며 작업하다 보니 생각보다 좋은 결과가 나온 것 같아 팀으로 하는 작업의 장점과 중요성을 깨달았습니다. 

시간관리의 중요성 및 계획 세우기의 필요성을 깨달았습니다.
앞서 말씀드렸다시피 생소한 코드를 다루게 되었고, 이로 인해 언제까지 코드를 이해하고 다루게 될 지 알 수 없었습니다. 하지만 그럴수록 더 계획을 세우고 그 계획에 맞추기 위해 노력해보고, 달성률에 따라 계획을 수정하는 과정을 거치는 과정이 필요하지 않았나 하는 생각이 듭니다. 막연하게 어려우니까 최대한 빨리 이해하고 진행하자는 생각보다 계획에 따라 행동하는 편이 속도면에서나, 내가 제대로 이해했는지, 이해하는데 얼마나 걸리는지 알아보는 측면에서 좋았을거라는 생각이 들었습니다. 
또한 지나고보니 맡은 업무를 더 빨리 끝낼 수 있지 않았나 하는 생각이 들었습니다. 중간중간 시간관리를 제대로 했으면 프로젝트 도중에 이부분을 알아채고 더 집중할 수 있지 않았나 하는 생각이 들어 아쉬움이 남습니다.

다음 프로젝트에서는 제대로 계획을 세우고 작업을 진행하도록 할 생각입니다. 그리고 작업 중간중간 제대로 프로젝트를 진행하고 있는지 점검하는 시간을 가지도록 할 것입니다.
```
#### `이재완`
```
프로젝트를 하며, 프론트와 백엔드의 역할 분배와 각 역할의 중요성에 대해 잘 알게 됐습니다.
프론트는 기능 구현뿐만 아니라, 끝없는 css 작업을 사용자 입장에서 생각해야 하고,
백엔드는 서버를 통한 서비스가 막힘없이 진행될 수 있도록, 로직을 잘 설계해야 한다고 느꼈습니다.

팀을 위한 리더십이나 피드백 등에 대해서도 깊은 고민을 할 수 있었던 공통 프로젝트였습니다.
흔히들 프로젝트를 할 때, 뭐든 사람을 갈아넣으면 다 완성된다고 말하곤 합니다.
하지만, 너무 무리한 일정 진행은 오히려 역효과를 불러올 수도 있다는 점을 깨달았습니다.

그래서 pm 역할의 중요성과, 프로젝트 설계 과정, 지라의 중요성을 크게 느꼈습니다.
또, 구현할 기술에 대해 확실히 정의하고, 기술스택을 정할 필요가 있습니다.
만약 그랬다면 헤매는 과정을 줄이고, 대부분의 요구사항들을 구현할 수 있었을 것으로 예상합니다.
공통 프로젝트의 경우, 설계의 부족으로 낭비한 시간이 너무 많았습니다.
특화 프로젝트 때는 이 점들을 보완해서 더 완성도 높은 팀 프로젝트를 진행하고 싶습니다.
``` 
#### `최성민` 
```
spring이 처음이라 구현하는데에만 급급했고 보여주기 부끄러운 코드들인 것 같습니다. 
기본기가 많이 부족하다고 생각되었고 변수명, 여러가지 상황에 대한 처리 등 꼼꼼하게 코딩하지 못했습니다.
익숙한 기술이 아닌 처음하더라도 빠른속도로 꼼꼼하게 할 수 있는 사람이 될 수 있도록 노력하겠습니다.
```
#### `홍성민` 
```
이번 프로젝트에서는 익숙한 개발보다는 AI와 Docker를 학습하면서 많이 배울 수 있어서 좋았습니다. 완벽히 해내지는 못했지만 새로운 분야를 배운다는 것에 대한 자신감을 가질 수 있는 계기가 되었습니다.
순간의 귀찮음을 참고 틈틈이 습득한 지식을 정리하였습니다. 다시 보면서 혼자서는 많은 도움이 되었지만 다음 번에는 팀원들에게도 많은 도움을 줄 수 있게 정리해야겠습니다.

프로젝트 종료 몇 일 전, 문제를 해결하면서 팀플레이의 중요성을 느낄 수 있었습니다. 프론트 코드가 통합되면서부터 잘 돌아가던 서버가 오류 투성이로 변했습니다. 서버문제라고 판단했던 저는 혼자서 밤새 에러를 해결해보려 했지만 실패했습니다. 다음 날, 프론트, 백 팀원들이 전부 뭉쳐서 로컬에서부터 생겨난 문제점들을 차근차근 해결했고 다시 서버를 원활하게 하는데 성공했습니다. 에러를 안나게 고치는데에만 신경썼던 저는 에러를 일부러 발생시켜서 문제를 해결하는 팀원분들을 보면서 큰 깨달음을 얻을 수 있었습니다.

깊은 생각없이 팀장을 맡아 시작하게 되었지만 프로젝트를 마무리 하는 지금은 많은 부분에서 성장하였고, 결론적으로 팀장하길 참 잘했다고 생각이 듭니다.
4조 팀원들과 손떨리는 커피내기로 색다르게 시작하는 아침과 퇴근전에 칭찬을 하면서 서로의 장점과 자존감을 찾아주었던 시간들이 그리울 것 같습니다.
생각의 차이나 열정의 온도가 다를 때도 있었지만 자신의 위치에서 진지하게 최선을 다해준 팀원분들께 진심으로 감사합니다.
``` 
