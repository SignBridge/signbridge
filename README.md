# 손길

## 1️⃣ 손길 소개 및 시연 영상

### Overview

기존 농인들이 이용하던 통신중계서비스인 ‘손말이음센터’의 간편화를 통한 농인의 사회적 서비스 이용 편리화

## 2️⃣ 서비스 화면

### 사용자

#### 메인 - 통역 서비스 선택 버튼
![ezgif.com-video-to-gif__1_](/uploads/269d94532492f930b0b71351786f51b4/ezgif.com-video-to-gif__1_.gif)

![ezgif.com-video-to-gif](/uploads/a77e0da9e2892d040301755e388c18b8/ezgif.com-video-to-gif.gif)

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

- webRTC를 통한 실시간 화상 통역 매칭 서비스

- STT를 이용한 대화 내용 인식 및 기록

- AI를 이용한 수어 to 자막 통역 서비스

- AI를 이용한 음성 to 애니메이션 통역 서비스

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
 - java open jek 17
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
//### 기능 명세 요구사항 정의서
## Rest API
## ERD
![image](https://user-images.githubusercontent.com/53904156/218959361-7bd73e44-d0b5-4991-97bc-40f0d725a899.png)
<br/>

## 와이어 프레임
![Design system for React   Figma  Web app templates (Community)2](https://user-images.githubusercontent.com/53904156/218961580-69f0958d-7f4b-438b-9e2d-1094ba415893.png)
<br />

## Convention
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

## 팀 소개
### 프론트
`강인주`, `이지예`, `박채성`
### 백엔드
`이재완`, `홍성민`, `최성민`
<br />


## 5️⃣Rest API

## 6️⃣ERD

## 7️⃣와이어 프레임

## 8️⃣Convention

## 9️⃣팀 소개

## 🔟팀 소개

### 팀원별 역할

### 소감
