# FrontEnd
```
모든 과정은 Visual Studio Code를 기준으로 작성되었고, 크로니움 기반의 브라우저에서만 정상 동작 합니다.
```
## 로컬에서 실행 방법
```
git clone https://lab.ssafy.com/s08-webmobile1-sub2/S08P12D204.git
cd Frontend/sueogajunggye
npm i --force
npm start
```
## 프론트엔드 빌드 및 배포
```
#Dockerfile

# nginx 이미지를 사용합니다.
FROM nginx:stable-alpine

# work dir 고정
WORKDIR /app

# work dir에 build폴더 생성
RUN mkdir ./build

# host pc의 현재 경로의 build 폴더를 workdir의 build 폴더로 복사
ADD ./build ./build

# nginx의 default.conf를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 nginx.conf를 아래 오른쪽 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 3000 포트 오픈
EXPOSE 3000

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
```

```
# react 파일이 있는 경로로 이동한 후
#
npm install

npm run build

(sudo) docker build -t frontend .

(sudo) docker run -d -p 3000:3000 --name frontend {image id}
```
